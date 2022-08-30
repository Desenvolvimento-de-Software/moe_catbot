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

import express from "express";
import App from "../App.js";
import TelegramBotApi from "../library/telegram/TelegramBotApi.js";
import DeleteMessage from "../library/telegram/resource/DeleteMessage.js";

export default class DefaultController {

    /**
     * App instance.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    protected app: App;

    /**
     * Controller main path.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @var {string}
     */
    protected path: string;

    /**
     * Controller routes.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @var {express.Router}
     */
    protected router = express.Router();

    /**
     * The constructor.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param {App}    app
     * @param {string} path
     */
    public constructor(app: App, path?: string) {
        this.app  = app;
        this.path = path || "/";
        this.initializeRoutes();
        TelegramBotApi.setToken(process.env.TELEGRAM_BOT_TOKEN || "");
    }

    /**
     * Controller's main route.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param {express.Request}  request
     * @param {express.Response} response
     */
    public index(request: Record<string, any>, response: Record<string, any>): void {
        response.sendStatus(403);
    }

    /**
     * Returns the controller's routes.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @returns {express.Router}
     */
    public getRoutes(): express.Router {
        return this.router;
    }

    /**
     * Deletes a message.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    protected async deleteMessage(messageId: number, chatId: number): Promise<void> {

        const deleteMessage = new DeleteMessage();
        deleteMessage
            .setMessageId(messageId)
            .setChatId(chatId)
            .post();
    }

    /**
     * Initializes the controller's routes.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    protected initializeRoutes(): void {
        this.router.all(this.path, this.index.bind(this));
    }
}
