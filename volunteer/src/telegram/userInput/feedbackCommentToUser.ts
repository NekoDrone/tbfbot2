import { AuthUser } from "../../exports/types";
import editMessageWithInlineButtons from "../editMessageWithInlineButtons";
import * as type from "../../exports/types";

export default function feedbackCommentToUser(
  inputString: string,
  userDoc: AuthUser
) {
  const messageText = `Add comment:\n\n"${inputString}"\n\nIs this correct?`;
  const buttons: string[] = [type.Query.Confirm, type.Query.Edit];
  editMessageWithInlineButtons(userDoc, buttons, messageText);
}
