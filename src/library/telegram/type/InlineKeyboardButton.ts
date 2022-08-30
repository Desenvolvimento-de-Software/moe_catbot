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

 export type InlineKeyboardButton = {
    text                              : String,
    url?                              : String,
    login_url?                        : String,
    callback_data?                    : String,
    switch_inline_query?              : String,
    switch_inline_query_current_chat? : String,
    // callback_game?                    :CallbackGame?,
    pay?                              : Boolean
};
