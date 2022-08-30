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

import fs from "fs";
import path from "path";
import express from "express";
import IncomingController from "./controller/Incoming.js";
import DefaultController from "./controller/Controller.js";
import GetUpdates from "./library/telegram/resource/GetUpdates.js";

export default class App {

    /**
     * Stores the application base path.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    private basepath: string;

    /**
     * Express application instance.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @var {express.Application}
     */
    private app: express.Application;

    /**
     * Application port.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @var {number}
     */
    private port: number;

    /**
     * The constructor.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    constructor() {
        this.app = express();
        this.port = (process.env.PORT || 3000) as number;
        this.basepath = path.resolve();
        this.initializeMiddlewares();
    }

    /**
     * Returns the base path.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param path
     *
     * @returns Parsed path.
     */
    public getBasePath(path?: string): string {
        return this.basepath + (path ? path : "");
    }

    /**
     * Starts to listen in the specified port.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @return {void}
     */
    public addControllers(controllers: Array<DefaultController>): void {
        controllers.forEach((controller) => {
            this.app.use("/", controller.getRoutes());
        });
    }

    /**
     * Starts to listen in the specified port.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @return {void}
     */
    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Listening on port ${this.port}`);
        });
    }

    /**
     * Makes the long polling to the Telegram API.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {number} offset
     */
    public async initializeLongPolling(offset?: number): Promise<void> {

        const request = new GetUpdates();

        if (typeof offset !== "undefined" && offset.toString().length) {
            request.setOffset(offset);
        }

        try {

            const response = await request.post();
            const json     = await response.json();

            let newOffset;

            for (let i = 0, length = json.result.length; i < length; i++) {

                const update = json.result[i];
                newOffset    = update.update_id + 1;

                (new IncomingController(this)).handle(update);
            }

            this.initializeLongPolling(newOffset);

        } catch (err) {
            console.log(err);
            this.initializeLongPolling();
        }
    }

    /**
     * Saves an entry to the log.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param content
     */
    public log(content: string): void {

        const date = new Date();

        const year  = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day   = (date.getDate()).toString().padStart(2, "0");

        const hours   = (date.getHours()).toString().padStart(2, "0");
        const minutes = (date.getMinutes()).toString().padStart(2, "0");
        const seconds = (date.getSeconds()).toString().padStart(2, "0");

        const filename = `${year}-${month}-${day}.log`;
        fs.appendFileSync(`./log/${filename}`, `${hours}:${minutes}:${seconds} :: ${content}\n`);
    }

    /**
     * Initializes the middlewares.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @return {void}
     */
    private initializeMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended : true }));
    }
}
