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
import { GetUpdatesType } from "../type/GetUpdates.js";

export default class GetUpdates extends TelegramBotApi {

    /**
     * Method payload.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
     protected payload: GetUpdatesType = {};

    /**
     * The constructor.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    public constructor() {
        super("getUpdates");
    }

    /**
     * Sets the offset.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {number} offset
     *
     * @return {GetUpdates}
     */
    public setOffset(offset: number): GetUpdates {
        this.payload.offset = offset;
        return this;
    }

    /**
     * Sets the limit.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {number} limit
     *
     * @return {GetUpdates}
     */
    public setLimit(limit: number): GetUpdates {
        this.payload.limit = limit;
        return this;
    }

    /**
     * Sets the timeout.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {number} timeout
     *
     * @return {GetUpdates}
     */
    public setTimeout(timeout: number): GetUpdates {
        this.payload.timeout = timeout;
        return this;
    }

    /**
     * Sets the allowed updates.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {Array<string>} allowedUpdates
     *
     * @return {GetUpdates}
     */
    public setAllowedUpdates(allowedUpdates: Array<string>): GetUpdates {
        this.payload.allowed_updates = allowedUpdates;
        return this;
    }
}
