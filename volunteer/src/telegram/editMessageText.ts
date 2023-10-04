import axios from "axios";
import { TELEGRAM_URL, TELEGRAM_BOT_KEY } from "../exports/consts";
import { AuthUser } from "../exports/types";

const telegramMethodUrl = TELEGRAM_URL + TELEGRAM_BOT_KEY + "/editMessageText";

export default function editMessageText(userDoc: AuthUser, newMessage: string) {
    const options = {
        chat_id: userDoc.telegramId,
        message_id: userDoc.sessionMessageId,
        text: newMessage,
    };
    axios.post(telegramMethodUrl, options).catch(function (error) {
        console.error(error);
    });
}
