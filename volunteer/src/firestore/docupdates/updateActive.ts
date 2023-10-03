import { AuthUser } from "../../exports/types";
import updateAuthUserDoc from "./updateAuthUserDoc";

/**
 * Updates a user's document entry in the database with the given (in)active state.
 * @param {AuthUser} userDoc - The full document entry to update.
 * @param {boolean} state - The Telegram message ID to write to the user's entry in the database.
 */
export default async function updateActive(userDoc: AuthUser, state: boolean): Promise<void> {
    const newDoc: AuthUser = userDoc;
    newDoc.active = state;
    console.log(`Attempting to update new document with pair "active: ${newDoc.active}"`);
    updateAuthUserDoc(newDoc.telegramId, newDoc);
}
