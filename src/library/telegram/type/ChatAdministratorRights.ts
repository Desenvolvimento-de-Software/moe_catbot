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

export type ChatAdministratorRights = {
    isAnonymous?: boolean;
    canManageChat?: boolean;
    canDeleteMessages?: boolean;
    canMessageVideoChats?: boolean;
    canRestrictMembers?: boolean;
    canPromoteMembers?: boolean;
    canChangeInfo?: boolean;
    canInviteUsers?: boolean;
    canPostMessages?: boolean;
    canEditMessages?: boolean;
    canPinMessages?: boolean;
    canManageTopics?: boolean;
};
