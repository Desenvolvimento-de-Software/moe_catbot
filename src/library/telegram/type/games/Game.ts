/**
 * Ada Lovelace Telegram Bot
 *
 * This file is part of Ada Lovelace Telegram Bot.
 * You are free to modify and share this project or its files.
 *
 * @package  mslovelace_bot
 * @author   Marcos Leandro <mleandrojr@yggdrasill.com.br>
 * @license  GPLv3 <http://www.gnu.org/licenses/gpl-3.0.en.html>
 */

import { Animation } from "../Animation";
import { MessageEntity } from "../MessageEntity";
import { PhotoSize } from "../PhotoSize";

export type Game = {
    title: string;
    description: string;
    photo: PhotoSize[];
    text?: string;
    textEntities?: MessageEntity[];
    animation?: Animation;
};
