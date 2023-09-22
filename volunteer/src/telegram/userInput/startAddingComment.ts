import { AuthUser } from "../../exports/types";
import updateAuthUserDoc from "../../firestore/docupdates/updateAuthUserDoc";
import editMessageWithInlineButtons from "../editMessageWithInlineButtons";
import * as type from "../../exports/types";

export default function startAddingComment(userDoc: AuthUser) {
  const buttons = [type.Query.Cancel];
  const message = "Please type in your comment and send it.";
  editMessageWithInlineButtons(userDoc, buttons, message);
  var docUpdate = userDoc;
  docUpdate.expectingStringInput = true;
  updateAuthUserDoc(userDoc.telegramId, docUpdate);
}
