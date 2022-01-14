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

import TelegramBotApi from "../TelegramBotApi.js";
import { UnbanChatMemberType } from "./type/UnbanChatMember.js";

export default class UnbanChatMember extends TelegramBotApi {

    /**
     * Method payload.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    protected payload: UnbanChatMemberType = {};

    /**
     * The constructor.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    public constructor() {
        super("unbanChatMember");
    }

    /**
     * Sets the chat id.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {number} User Telegram ID
     *
     * @return {UnbanChatMember}
     */
    public setUserId(userId: number): UnbanChatMember {
        this.payload.user_id = userId;
        return this;
    }

    /**
     * Sets the chat id.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {number} Chat Telegram ID
     *
     * @return {UnbanChatMember}
     */
    public setChatId(chatId: number): UnbanChatMember {
        this.payload.chat_id = chatId;
        return this;
    }

    /**
     * Sets the "only if banned" flag.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {boolean}
     *
     * @return {UnbanChatMember}
     */
    public setOnlyIfBanned(onlyIfBanned: boolean): UnbanChatMember {
        this.payload.only_if_banned = onlyIfBanned;
        return this;
    }
}
