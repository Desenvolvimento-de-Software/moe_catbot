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

import { MaskPosition } from "./MaskPosition.js";
import { PhotoSize } from "../PhotoSize.js";

export type Sticker = {
    fileId: string;
    fileUniqueId: string;
    type: string;
    width: number;
    height: number;
    isAnimated: boolean;
    isVideo: boolean;
    thumbnail?: PhotoSize;
    emoji?: string;
    setName?: string;
    maskPosition?: MaskPosition;
    customEmojiId?: string;
    needsRepainting?: boolean;
    fileSize?: number;
};
