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

import { InputFile } from "./InputFile.js";

export type InputMediaAnimation = {
    type: string;
    media: string;
    thumbnail?: InputFile|string;
    caption?: string;
    parseMode?: string;
    width?: number;
    height?: number;
    duration?: number;
    hasSpoiler?: boolean;
};
