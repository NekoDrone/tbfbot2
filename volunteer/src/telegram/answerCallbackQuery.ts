import axios from "axios";
import { TELEGRAM_BOT_KEY, TELEGRAM_URL } from "../exports/consts";

const telegramMethodUrl = TELEGRAM_URL + TELEGRAM_BOT_KEY + "/answerCallbackQuery";

/**
 * Answers the callback query required by Telegram with an empty callback notification.
 * @param {string} queryId - "Unique identifier for the query to be answered" - from telegram; as a string.
 */
export default function answerCallbackQuery(queryId: string): void {
    const options = {
        callback_query_id: queryId,
    };
    axios.post(telegramMethodUrl, options);
}
