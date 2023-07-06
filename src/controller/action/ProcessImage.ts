/**
 * Catbot Telegram Bot
 *
 * This file is part of Catbot Telegram Bot.
 * You are free to modify and share this project or its files.
 *
 * @package  moe_catbot
 * @author   Marcos Leandro <mleandrojr@yggdrasill.com.br>
 * @license  GPLv3 <http://www.gnu.org/licenses/gpl-3.0.en.html>
 */

import App from "../../App.js";
import Action from "../Action.js";
import TelegramBotApi from "../../library/telegram/TelegramBotApi.js";
import EditMessageText from "../../library/telegram/resource/EditMessageText.js";
import GetFile from "../../library/telegram/resource/GetFile.js";
import SendMessage from "../../library/telegram/resource/SendMessage.js";
import User from "../../library/catbox/resource/User.js";
import { fileFromPath } from "formdata-node/file-from-path";
import fetch from "node-fetch";
import path from "path";
import fs from "fs";

export default class ProcessImage extends Action {

    /**
     * Sent message ID.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    private messageId: number|null = null;

    /**
     * The constructor.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    public constructor(app: App) {
        super(app);
    }

    /**
     * Action routines.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param payload
     */
    public async run(payload: Record<string, any>): Promise<void> {

        let method: Function | null = null;

        switch (true) {

            case payload.message.hasOwnProperty("photo"):
                method = this.getFileIdByPhoto;
                break;

            case payload.message.hasOwnProperty("video"):
                method = this.getFileIdByVideo;
                break;

            case payload.message.hasOwnProperty("document"):
                method = this.getFileIdByDocument;
                break;
        }

        if (!method) {
            return;
        }

        const fileId = method(payload);
        if (!fileId) {
            return;
        }

        const getFile = new GetFile();
        getFile.setFileId(fileId);

        const fileRequest = await getFile.post();
        const fileResponse = await fileRequest.json();
        const fileUrl = TelegramBotApi.getFileUrl(fileResponse.result.file_path);

        try {

            await this.getFileData(payload, fileUrl, fileResponse.result.file_path);

        } catch (err) {
            const editMessageText = new EditMessageText();
            editMessageText
                .setChatId(payload.message.chat.id)
                .setMessageId(this.messageId || 0)
                .setText("❌ An error occurred while downloading your image. 😢")
                .setParseMode("HTML")
                .post();
        }
    }

    /**
     * Returns the file ID by the photo attribute.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @return {string}
     */
    private getFileIdByPhoto(payload: Record<string, any>): string|null {
        const photos = payload.message.photo;
        const photo = photos.at(-1);
        return photo.file_id || null;
    }

    /**
     * Returns the file ID by the photo attribute.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @return {string}
     */
    private getFileIdByVideo(payload: Record<string, any>): string|null {
        const video = payload.message.video;
        return video.file_id || null;
    }

    /**
     * Returns the file ID by the document attribute.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @return {string}
     */
    private getFileIdByDocument(payload: Record<string, any>): string|null {
        const document = payload.message.document;
        return document.file_id || null;
    }

    /**
     * Returns the file data.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param url
     */
    private async getFileData(payload: Record<string, any>, url: string, filepath: string): Promise<void> {

        const sendMessage = new SendMessage();
        sendMessage
            .setChatId(payload.message.chat.id)
            .setText("⬇️ Downloading your image...")
            .setParseMode("HTML");

        if (Number(payload.message.chat.id) > 0) {
            sendMessage.setReplyToMessageId(payload.message.message_id);
        }

        const messageRequest = await sendMessage.post();
        const messageResponse = await messageRequest.json();
        this.messageId = messageResponse.result.message_id;

        const fileRequest = await fetch(url);
        const file = await fileRequest.blob();
        const destination = this.app.getBasePath(`/tmp/${payload.message.from.id}/${filepath}`);

        const directory = path.dirname(destination);
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const writeStream = fs.createWriteStream(destination, { flags: "w" });

        writeStream.write(buffer);
        writeStream.end(() => {

            if (Number(payload.message.chat.id) < 0) {
                this.deleteMessage(payload.message.message_id, payload.message.chat.id);
            }

            this.sendToCatbox(payload, destination);
        });
    }

    /**
     * Sends the file to Catbox.moe.
     *
     * @author Marcos Leandro
     * @xince  1.0.0
     *
     * @param payload
     * @param rawData
     */
    private async sendToCatbox(payload: Record<string, any>, filepath: string): Promise<void> {

        const editMessageText = new EditMessageText();
        editMessageText
            .setChatId(payload.message.chat.id)
            .setMessageId(this.messageId || 0)
            .setText("⬆️ Sending your image to https://catbox.moe ...")
            .setParseMode("HTML")
            .post();

        const filename = path.basename(filepath);
        const file = await fileFromPath(filepath);
        const user = new User();
        user
            .setReqType("fileupload")
            .setFileToUpload(file, filename);

        const request = await user.post();
        const response = await request.text();

        if (response) {

            const filesize = this.getParsedSize(file.size);

            let message = "";

            if (Number(payload.message.chat.id) > 0) {
                message += `✅ <b>Uploaded Successfully!</b>\n\n`;
                message += `☁️ Service: Catbox\n`;
                message += `🗂️ Size: ${filesize}\n`;
                message += `⏲️ Expires within: ∞\n`;
                message += `📎 Link: <code>${response}</code>\n\n`;
                message += `Tap or click on the link 👆 to copy it to your clipboard.\n\n`;
                message += `⚡ Stay tuned at <a href="https://github.com/Desenvolvimento-de-Software/moe_catbot">GitHub</a>`;

            } else {

                const userId = payload.message.from.id;
                const username = (payload.message.from.first_name || payload.message.from.username);
                
                message += `${response}\n\n`;

                if (payload.message.caption) {
                    message += `${payload.message.caption}\n\n`;
                }

                message += `👤 From <a href=\"tg://user?id=${userId}\">${username}</a>\n`;
                message += `🤖 By @moe_catbot`;
            }

            editMessageText
                .setChatId(payload.message.chat.id)
                .setMessageId(this.messageId || 0)
                .setText(message)
                .setParseMode("HTML")
                .setDisableWebPagePreview(Number(payload.message.chat.id) > 0)
                .post();
        }

        fs.unlinkSync(filepath);
    }

    /**
     * Returns the parsed filesize.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param size Raw filesize.
     *
     * @return Parsed filesize.
     */
    private getParsedSize(size: number): string {

        const steps = ["B", "KB", "MB", "GB"];
        let i = 0;

        while (size > 1024) {
            size /= 1024;
            i++;
        }

        if (typeof steps[i] === "undefined") {
            return "∞";
        }

        return size.toFixed(2) + " " + steps[i];
    }
}
