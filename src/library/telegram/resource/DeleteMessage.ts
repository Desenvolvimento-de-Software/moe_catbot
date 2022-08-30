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

import TelegramBotApi from "../TelegramBotApi.js";
import { DeleteMessageType } from "../type/DeleteMessage.js";

export default class DeleteMessage extends TelegramBotApi {

    /**
     * Method payload.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    protected payload: DeleteMessageType = {};

    /**
     * The constructor.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    public constructor() {
        super("deleteMessage");
    }

    /**
     * Sets the chat id.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {number} chat_id
     *
     * @return {DeleteMessage}
     */
    public setChatId(chatId: number): DeleteMessage {
        this.payload.chat_id = chatId;
        return this;
    }

    /**
     * Sets the chat id.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {number} messageId
     *
     * @return {DeleteMessage}
     */
     public setMessageId(messageId: number): DeleteMessage {
        this.payload.message_id = messageId;
        return this;
    }
}
