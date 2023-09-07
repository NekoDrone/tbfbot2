import { firestoreCollection } from "../../exports/consts";
/**
 * Updates a user's document entry in the database with the selected case key.
 * @param {number} userId - The Telegram user ID in numerical form.
 * @param {string} caseKey - The case key as a string.
 */
export default async function updateUserSelectedCase(userId: number, caseKey: string): Promise<void> {
    const doc = (await firestoreCollection.where('telegramid', '==', userId).get()).docs[0].ref;
    const data = {
        selectedCase: caseKey
    }
    doc.update(data); //TODO: refactor to use updateAuthUserDoc()
}