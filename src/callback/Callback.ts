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

import Context from "../library/telegram/context/Context";

export default abstract class Callback {

    /**
     * Bot context.
     *
     * @author Marcos Leandro
     * @since  2023-06-07
     */
    protected context: Context;

    /**
     * The constructor.
     *
     * @author Marcos Leandro
     * @since 2023-06-07
     *
     * @param context
     * @param type
     */
    public constructor(context: Context) {
        this.context = context;
    }
}
