import { AuthUser } from "../../exports/types";
import updateAuthUserDoc from "./updateAuthUserDoc";

/**
 * Updates a user's document entry in the database with the current active message ID.
 * @param {AuthUser} userDoc - The full document entry to update.
 * @param {number} messageId The Telegram message ID to write to the user's entry in the database.
 */
export default async function updateSessionMessageId(
    userDoc: AuthUser,
    messageId: number,
): Promise<void> {
    const newDoc: AuthUser = userDoc;
    newDoc.sessionMessageId = messageId;
    console.log(
        `Attempting to update new document with pair "sessionMessageId: ${newDoc.sessionMessageId}"`,
    );
    updateAuthUserDoc(newDoc.telegramId, newDoc);
}
