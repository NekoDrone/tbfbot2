import { AuthUser } from "../../exports/types";
import updateAuthUserDoc from "../../firestore/docupdates/updateAuthUserDoc";

export default function handleStringInput(
  inputString: string,
  userDoc: AuthUser
) {
  const newDoc = userDoc;
  newDoc.inputString = inputString;
  updateAuthUserDoc(userDoc.telegramId, newDoc);
}
