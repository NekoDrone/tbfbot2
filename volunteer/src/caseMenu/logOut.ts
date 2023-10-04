import { AuthUser } from "../exports/types";
import updateAuthUserDoc from "../firestore/docupdates/updateAuthUserDoc";
import editMessageText from "../telegram/editMessageText";

export default function logOut(userDoc: AuthUser): void {
    const docUpdate = userDoc;
    editMessageText(docUpdate, "Logged out. Have an ultra slay day :D");
    docUpdate.active = false;
    docUpdate.selectedCase = "";
    docUpdate.sessionMessageId = 0;
    updateAuthUserDoc(docUpdate.telegramId, docUpdate);
}
