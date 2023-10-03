import { AuthUser } from "../../exports/types";
import updateAuthUserDoc from "./updateAuthUserDoc";
/**
 * Updates a user's document entry in the database with the selected case key.
 * @param {AuthUser} userDoc - The full document entry to update.
 * @param {string} caseKey - The case key as a string to write to the user's entry in the database
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
