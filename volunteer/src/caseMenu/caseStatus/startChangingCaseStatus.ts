import { Query, AuthUser } from "../../exports/types";
import editMessageWithInlineButtons from "../../telegram/editMessageWithInlineButtons";

export default function startChangingCaseStatus(userDoc: AuthUser) {
  const buttons: string[] = [Query.EscalateCase, Query.CloseCase];
  const messageText = `You are editing ${userDoc.selectedCase}. Changing case status must be accompanied with a comment.`;
  editMessageWithInlineButtons(userDoc, buttons, messageText);
}
