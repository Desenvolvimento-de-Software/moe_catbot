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

import Action from "./Action";
import Context from "../library/telegram/context/Context";
import UserHelper from "../helper/User";
import ChatHelper from "../helper/Chat";
import RelUsersChats from "../model/RelUsersChats";

export default class saveUserAndChat extends Action {

    /**
     * The constructor.
     *
     * @author Marcos Leandro
     * @since  2023-06-02
     *
     * @param context
     */
    constructor(context: Context) {
        super(context, "sync");
    }

    /**
     * Run the action.
     *
     * @author Marcos Leandro
     * @since  2023-06-06
     */
    public async run(): Promise<void> {

        if (!this.context.newChatMember) {
            return;
        }

        const user = await UserHelper.getUserByTelegramId(this.context.newChatMember!.getId());
        const userId = user === null ? await UserHelper.createUser(this.context.newChatMember) : user.id;

        const chat = await ChatHelper.getChatByTelegramId(this.context.chat.getId());
        const chatId = chat === null ? await ChatHelper.createChat(this.context.chat) : chat.id;

        UserHelper.updateUser(this.context.newChatMember);
        ChatHelper.updateChat(this.context.chat);

        if (!await this.hasRelationship(userId, chatId)) {
            return await this.saveRelationship(userId, chatId);
        }

        return await this.updateRelationship(userId, chatId);
    }

    /**
     * Returns if the user has a relationship with the chat.
     *
     * @author Marcos Leandro
     * @since  2023-06-06
     *
     * @param userId
     * @param chatId
     *
     * @returns {Promise<boolean>}
     */
    private async hasRelationship(userId: number, chatId: number): Promise<boolean> {

        const relUserChat = new RelUsersChats();
        relUserChat
            .select()
            .where("user_id").equal(userId)
            .and("chat_id").equal(chatId)
            .offset(0)
            .limit(1);

        const row = await relUserChat.execute();
        return !!row.length;
    }

    /**
     * Saves the relationship between the user and the chat.
     *
     * @author Marcos Leandro
     * @since  2023-06-06
     *
     * @param userId
     * @param chatId
     *
     * @returns {Promise<void>}
     */
    public async saveRelationship(userId: number, chatId: number): Promise<void> {

        const relUserChat = new RelUsersChats();
        relUserChat
            .insert()
            .set("user_id", userId)
            .set("chat_id", chatId)
            .set("date", Math.floor(Date.now() / 1000));

        return relUserChat.execute();
    }

    /**
     * Updates the relationship between the user and the chat.
     *
     * @author Marcos Leandro
     * @since  2023-06-06
     *
     * @param userId
     * @param chatId
     *
     * @returns {Promise<void>}
     */
    private async updateRelationship(userId: number, chatId: number): Promise<void> {

        const relUserChat = new RelUsersChats();
        relUserChat
            .update()
            .set("joined", 1)
            .set("checked", 0)
            .where("user_id").equal(userId)
            .and("chat_id").equal(chatId);

        return relUserChat.execute();
    }
}
