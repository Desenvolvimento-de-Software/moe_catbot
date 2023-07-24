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

import { MessageEntity } from "./MessageEntity.js";

export type InputMediaPhoto = {
    type: string;
    media: string;
    caption?: string;
    parseMode?: string;
    captionEntities?: MessageEntity[];
    hasSpoiler?: boolean;
};
