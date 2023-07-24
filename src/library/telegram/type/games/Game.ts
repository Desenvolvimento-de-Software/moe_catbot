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

import { Animation } from "../Animation.js";
import { MessageEntity } from "../MessageEntity.js";
import { PhotoSize } from "../PhotoSize.js";

export type Game = {
    title: string;
    description: string;
    photo: PhotoSize[];
    text?: string;
    textEntities?: MessageEntity[];
    animation?: Animation;
};
