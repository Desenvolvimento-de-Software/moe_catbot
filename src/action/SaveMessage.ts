/**
 * Ada Lovelace Telegram Bot
 *
 * This file is part of Ada Lovelace Telegram Bot.
 * You are free to modify and share this project or its files.
 *
 * @package  mslovelace_bot
 * @author   Marcos Leandro <mleandrojr@yggdrasill.com.br>
 * @license  GPLv3 <http://www.gnu.org/licenses/gpl-3.0.en.html>
 */

import Action from "./Action.js";
import Context from "../library/telegram/context/Context.js";
import UserHelper from "../helper/User.js";
import ChatHelper from "../helper/Chat.js";
import Messages from "../model/Messages.js";

export default class saveUserAndChat extends Action {

    /**
     * The constructor.
     *
     * @author Marcos Leandro
     * @since  2023-06-02
     *
     * @param context
     */
    public constructor(context: Context) {
        super(context, "async");
    }

    /**
     * Runs the action.
     *
     * @author Marcos Leandro
     * @since  2023-06-06
     */
    public async run(): Promise<void> {

        if (!this.context.message) {
            return;
        }

        const contextUser = this.context.newChatMember || this.context.leftChatMember || this.context.user;
        const user = await UserHelper.getUserByTelegramId(contextUser.getId());
        const chat = await ChatHelper.getChatByTelegramId(this.context.chat.getId());

        switch (this.context.type) {
            case "message":
                this.saveNewMessage(user, chat);
                break;

            case "editedMessage":
                this.updateMessage(user, chat);
                break;
        }

        return Promise.resolve();
    }

    /**
     * Saves the new message.
     *
     * @author Marcos Leandro
     * @since  2023-06-16
     *
     * @param user
     * @param chat
     *
     * @return Promise<void>
     */
    private async saveNewMessage(user: Record<string, any>, chat: Record<string, any>): Promise<void> {

        const message = new Messages();
        const insert = message.insert();
        insert
            .set("user_id", user.id)
            .set("chat_id", chat.id)
            .set("message_id", this.context.message.getId())
            .set("content", this.context.message.getText())
            .set("date", this.context.message.getDate() || Math.floor(Date.now() / 1000));

        const threadId = this.context.message.getMessageThreadId();
        if (threadId) {
            insert.set("thread_id", threadId);
        }

        const reply = this.context.message.getReplyToMessage();
        if (reply) {
            insert.set("reply_to", this.getReplyMessageId(reply.getId()));
        }

        const entities = this.context.message.getEntities();
        if (entities) {
            insert.set("entities", JSON.stringify(entities));
        }

        message.execute();
        return Promise.resolve();
    }

    /**
     * Updates a message.
     *
     * @author Marcos Leandro
     * @since  2023-06-16
     *
     * @param user
     * @param chat
     *
     * @return Promise<void>
     */
    private async updateMessage(user: Record<string, any>, chat: Record<string, any>): Promise<void> {

        const message = new Messages();
        const update = message.update();
        update
            .set("content", this.context.message.getText())
            .set("date", this.context.message.getDate() || Math.floor(Date.now() / 1000))
            .where("user_id").equal(user.id)
            .and("chat_id").equal(chat.id)
            .and("message_id").equal(this.context.message.getId());

        const threadId = this.context.message.getMessageThreadId();
        if (threadId) {
            update.set("thread_id", threadId);
        }

        const reply = this.context.message.getReplyToMessage();
        if (reply) {
            update.set("reply_to", this.getReplyMessageId(reply.getId()));
        }

        const entities = this.context.message.getEntities();
        if (entities) {
            update.set("entities", JSON.stringify(entities));
        }

        return Promise.resolve();
    }

    /**
     * Returns the message id of the reply.
     *
     * @author Marcos Leandro
     * @since  2023-06-16
     *
     * @param replyTo
     *
     * @return {number|null}
     */
    private getReplyMessageId(replyTo: number): number|null {

        const message = new Messages();
        message
            .select()
            .where("message_id").equal(replyTo);

        const reply = message.execute();
        if (reply.length) {
            return reply[0].id;
        }

        return null;
    }
}