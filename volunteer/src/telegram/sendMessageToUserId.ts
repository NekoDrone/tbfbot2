import axios from "axios";
import { TELEGRAM_URL } from "../exports/consts";
import { TELEGRAM_BOT_KEY } from "../exports/consts";
import { firestoreCollection } from "../exports/consts";
import updateSessionMessageId from "../firestore/docupdates/updateSessionMessageId";

const telegramMethodUrl = TELEGRAM_URL + TELEGRAM_BOT_KEY + "/sendMessage";

/**
 * Sends the specified message to a user on Telegram
 * @param {string} message - The message to send.
 * @param {number} userId - The user's numerical ID.
 * @returns {Promise<number>} A promise containing the message ID of the sent message on Telegram's servers.
 */
export default async function sendMessageToUserId(message: string, userId: number): Promise<number> {
  const options = {
      chat_id: userId,
      text: message
  }
  const confirmationResponse = await axios.post(telegramMethodUrl, options);
  const messageId: number = confirmationResponse.data.message_id;
  updateSessionMessageId(userId, messageId);
  return messageId;
}