import { AuthUser } from "../../exports/types";
import updateAuthUserDoc from "../../firestore/docupdates/updateAuthUserDoc";

export default function handleStringInput(
  inputString: string,
  userDoc: AuthUser
) {
  const docUpdate = userDoc;
  docUpdate.inputString = inputString;
  updateAuthUserDoc(userDoc.telegramId, docUpdate);
}
