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

import Context from "../library/telegram/context/Context.js";

export default abstract class Callback {

    /**
     * Bot context.
     *
     * @author Marcos Leandro
     * @since  2023-06-07
     *
     * @var {Context}
     */
    protected context: Context;

    /**
     * Registered callbacks.
     *
     * @author Marcos Leandro
     * @since  2023-06-13
     *
     * @var {string[]}
     */
    private callbacks: string[] = [];

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

    /**
     * Action routines.
     *
     * @author Marcos Leandro
     * @since  2023-06-12
     */
    public async run(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    /**
     * Answers a callback query.
     *
     * @author Marcos Leandro
     * @since  2023-07-12
     *
     * @param {string} response
     *
     * @return {Promise<Record<string, any>>}
     */
    public async answer(response: string): Promise<Record<string, any>> {
        return this.context.callbackQuery!.answer(response);
    }

    /**
     * Returns whether the command is valid.
     *
     * @author Marcos Leandro
     * @since  2023-06-13
     *
     * @return {boolean}
     */
    public isCalled(): boolean {

        if (!this.context.callbackQuery?.callbackData || !this.context.callbackQuery?.callbackData.callback) {
            return false;
        }

        return this.callbacks.includes(this.context.callbackQuery?.callbackData.callback);
    }

    /**
     * Registers the callbacks.
     *
     * @author Marcos Leandro
     * @since  2023-06-13
     *
     * @param callbacks
     */
    protected setCallbacks(callbacks: string[]): void {
        this.callbacks = callbacks;
    }
}
