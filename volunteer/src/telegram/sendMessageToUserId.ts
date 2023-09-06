import axios from "axios";
import { TELEGRAM_URL } from "..";
import { TELEGRAM_BOT_KEY } from "..";
import { firestoreCollection } from "..";
import updateSessionMessageId from "../firestore/docupdates/updateSessionMessageId";

const telegramSendURL = TELEGRAM_URL + TELEGRAM_BOT_KEY + "/sendMessage";

export default function sendMessageToUserId(message: string, userId: number) {
    const options = {
        chat_id: userId,
        text: message
    }
    axios.post(telegramSendURL, options)
    .then((response) => {
      const messageId = response.data.message_id;
      updateSessionMessageId(userId, messageId);
    })
    .catch(function (error: any) {
      console.error(error);
    });
}