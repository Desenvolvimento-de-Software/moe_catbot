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

import { OrderInfo } from "./OrderInfo";
import { User } from "../User";

export type PreCheckoutQuery = {
    id: string;
    from: User;
    currency: string;
    totalAmount: number;
    invoicePayload: string;
    shippingOptionId?: string;
    orderInfo?: OrderInfo;
};
