import { firestoreCollection } from "../../exports/consts";
import { AuthUser } from "../../exports/types";

/**
 * Updates a user's document entry in the database with the updated version of the document.
 * @param {number} userId - The Telegram user ID in numerical form.
 * @param {AuthUser} userDoc - The updated document entry.
 */
export default async function updateAuthUserDoc(userId: number, userDoc: AuthUser): Promise<void> {
    const doc = (await firestoreCollection.where('telegramid', '==', userId).get()).docs[0].ref;
    doc.update(userDoc);
}