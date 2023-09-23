import { AuthUser } from "../exports/types";
import updateAuthUserDoc from "../firestore/docupdates/updateAuthUserDoc";
import editMessageWithInlineButtons from "../telegram/editMessageWithInlineButtons";

export default function logOut(userDoc: AuthUser): void {
    const docUpdate = userDoc;
    docUpdate.active = false;
    docUpdate.selectedCase = "";
    docUpdate.sessionMessageId = 0;
    updateAuthUserDoc(docUpdate.telegramId, docUpdate);
    editMessageWithInlineButtons(docUpdate, [], "Logged out. Have an ultra slay day :D");
}
