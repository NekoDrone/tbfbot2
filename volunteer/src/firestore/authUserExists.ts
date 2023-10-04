import { authUsersCollection } from "../exports/consts";

/**
 * Checks if the user ID exists in Firestore as a valid ID.
 * @param {number} userId - The Telegram user ID in numerical form
 * @returns A promise containing a boolean (true if exists).
 */
export default async function authUserExists(userId: number): Promise<boolean> {
    const userDoc = await authUsersCollection.where("telegramId", "==", userId).get();
    return !userDoc.empty;
}
