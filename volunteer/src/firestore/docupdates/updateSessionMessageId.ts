import { firestoreCollection } from "../../exports/consts";

/**
 * Updates a user's document entry in the database with the current active message ID.
 * @param {number} userId - The Telegram user ID in numerical form.
 * @param {number} messageId The Telegram message ID to write to the user's entry in the database.
 */
export default async function updateSessionMessageId(userId: number, messageId: number): Promise<void> {
    const doc = (await firestoreCollection.where('telegramid', '==', userId).get()).docs[0].ref;
    const data = {
        sessionMessageId: messageId
    }
    doc.update(data);
}