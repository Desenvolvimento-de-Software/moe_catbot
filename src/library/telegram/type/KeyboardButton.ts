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

import { KeyboardButtonPollType } from "./KeyboardButtonPollType.js";
import { KeyboardButtonRequestChat } from "./KeyboardButtonRequestChat.js";
import { KeyboardButtonRequestUser } from "./KeyboardButtonRequestUser.js";
import { WebAppInfo } from "./WebAppInfo.js";

export type KeyboardButton = {
    text: string;
    requestUser?: KeyboardButtonRequestUser;
    requestChat?: KeyboardButtonRequestChat;
    requestContact?: boolean;
    requestLocation?: boolean;
    requestPoll?: KeyboardButtonPollType;
    webApp?: WebAppInfo;
};
