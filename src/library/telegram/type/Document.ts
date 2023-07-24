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

import { PhotoSize } from "./PhotoSize.js";

export type Document = {
    fileId: string;
    fileUniqueId: string;
    thumbnail?: PhotoSize;
    fileName?: string;
    mimeType?: string;
    fileSize?: number;
};
