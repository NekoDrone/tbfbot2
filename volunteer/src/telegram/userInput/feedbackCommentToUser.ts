import { AuthUser } from "../../exports/types";
import editMessageWithInlineButtons from "../editMessageWithInlineButtons";

export default function feedbackCommentToUser(
  inputString: string,
  userDoc: AuthUser
) {
  const messageText = `Add comment:\n\n"${inputString}"\n\nIs this correct?`;
  const buttons: string[] = ["Confirm", "Edit"];
  editMessageWithInlineButtons(userDoc, buttons, messageText);
}
