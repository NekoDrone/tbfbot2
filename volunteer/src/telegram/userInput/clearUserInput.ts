import { AuthUser } from "../../exports/types";
import updateAuthUserDoc from "../../firestore/docupdates/updateAuthUserDoc";

/**
 * Resets the state of the conversation to that of before handling string inputs.
 * @param userDoc - An object of type AuthUser that contains both the state of the current conversation.
 */
export default function clearUserInput(userDoc: AuthUser) {
  const docUpdate = userDoc;
  docUpdate.expectingStringInput = false;
  docUpdate.inputString = "";
  updateAuthUserDoc(docUpdate.telegramId, docUpdate);
}
