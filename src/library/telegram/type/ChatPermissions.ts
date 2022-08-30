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

export type ChatPermissionsType = {
    can_send_messages?         : boolean,
    can_send_media_messages?   : boolean,
    can_send_polls?            : boolean,
    can_send_other_messages?   : boolean,
    can_add_web_page_previews? : boolean,
    can_change_info?           : boolean,
    can_invite_users?          : boolean,
    can_pin_messages?          : boolean
};
