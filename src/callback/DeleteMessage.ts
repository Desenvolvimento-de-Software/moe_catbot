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

import Callback from "./Callback.js";
import Context from "../library/telegram/context/Context.js";

export default class DeleteMessage extends Callback {

    /**
     * The constructor.
     *
     * @author Marcos Leandro
     * @since 1.0.0
     */
     public constructor(context: Context) {
        super(context);
        this.setCallbacks(["deleteMessage"]);
    }

    /**
     * Callback main route.
     *
     * @author Marcos Leandro
     * @since  2023-07-12
     */
    public async run(): Promise<void> {

        const isAdmin = await this.context.user.isAdmin();
        const isAuthor = this.context.callbackQuery?.callbackData.data.userId === this.context.user.getId();

        if (!isAuthor && !isAdmin) {
            this.answer("You cannot delete this message.");
            return;
        }

        this.context.message.delete();
        this.answer("Message removed.");
    }
}
