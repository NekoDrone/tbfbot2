import { authUsersCollection } from "../../exports/consts";

/**
 * Updates a user's document entry in the database with the current active message ID.
 * @param {number} userId - The Telegram user ID in numerical form.
 * @param {number} messageId The Telegram message ID to write to the user's entry in the database.
 */
export default async function updateSessionMessageId(
    userId: number,
    messageId: number,
): Promise<void> {
    const doc = (await authUsersCollection.where("telegramid", "==", userId).get()).docs[0].ref; //TODO: this will cause a TypeError if the user doesn't exist.
    const data = {
        sessionMessageId: messageId,
    };
    doc.update(data);
}
