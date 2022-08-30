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

import App from "./App.js";
import DefaultController from "./controller/Controller.js";
import IncomingController from "./controller/Incoming.js";

console.log('  ____      _   _           _');
console.log(' / ___|__ _| |_| |__   ___ | |_');
console.log('| |   / _` | __| \'_ \\ / _ \\| __|');
console.log('| |__| (_| | |_| |_) | (_) | |_');
console.log(' \\____\\__,_|\\__|_.__/ \\___/ \\__|');
console.log("");

const app = new App();

app.addControllers([
    new DefaultController(app),
    new IncomingController(app)
]);

app.listen();

if (process.env.TELEGRAM_WEBHOOK_ACTIVE?.toLowerCase() === "false") {
    app.initializeLongPolling();
}
