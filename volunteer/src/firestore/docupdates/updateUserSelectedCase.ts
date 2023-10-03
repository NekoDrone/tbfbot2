import { AuthUser } from "../../exports/types";
import updateAuthUserDoc from "./updateAuthUserDoc";
/**
 * Updates a user's document entry in the database with the selected case key.
 * @param {number} userId - The Telegram user ID in numerical form.
 * @param {string} caseKey - The case key as a string.
 */
export default async function updateUserSelectedCase(
    userDoc: AuthUser,
    caseKey: string,
): Promise<void> {
    const newDoc: AuthUser = userDoc;
    newDoc.selectedCase = caseKey;
    console.log(
        `Attempting to update new document with pair "selectedCase: ${newDoc.selectedCase}"`,
    );
    updateAuthUserDoc(newDoc.telegramId, newDoc);
}
