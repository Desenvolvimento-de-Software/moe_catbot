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

import { Chat } from "./Chat.js";
import { ChatInviteLink } from "./ChatInviteLink.js";
import { ChatMember } from "./ChatMember.js";
import { User } from "./User.js";

export type ChatMemberUpdated = {
    chat: Chat;
    from: User;
    date: number;
    oldChatMember: ChatMember;
    newChatMember: ChatMember;
    inviteLink?: ChatInviteLink;
    viaChatFolderInviteLink?: boolean;
};
