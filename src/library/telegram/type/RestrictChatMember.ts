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

import { ChatPermissionsType } from "../type/ChatPermissions.js";

export type RestrictChatMemberType = {
    chat_id?     : number,
    user_id?     : number,
    permissions? : ChatPermissionsType,
    until_date?  : number
};
