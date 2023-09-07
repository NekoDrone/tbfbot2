import { firestoreCollection } from "../../exports/consts";

/**
 * Updates a user's document entry in the database with the given (in)active state.
 * @param {number} userId - The Telegram user ID in numerical form.
 * @param {boolean} state - The Telegram message ID to write to the user's entry in the database.
 */
export default async function updateSessionMessageId(userId: number, state: boolean): Promise<void> {
    const doc = (await firestoreCollection.where('telegramid', '==', userId).get()).docs[0].ref;
    const data = {
        sessionMessageId: state
    }
    doc.update(data);
}