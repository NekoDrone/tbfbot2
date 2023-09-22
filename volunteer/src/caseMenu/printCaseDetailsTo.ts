import { AuthUser } from "../exports/types";
import getJiraIssue from "../jira/getJiraIssue";
import editMessageWithInlineButtons from "../telegram/editMessageWithInlineButtons";
import * as type from "../exports/types";

/**
 * Sends the case details of the specified issue to the telegram bot.
 * @param userDoc - An object of type AuthUser that contains the state of the conversation.
 */
export default async function printCaseDetailsTo(
  userDoc: AuthUser
): Promise<void> {
  const jiraIssue = await getJiraIssue(userDoc.selectedCase);
  const buttons = [type.Query.Back];
  const issueDesc = jiraIssue.fields.description.content[0].content[0].text;
  editMessageWithInlineButtons(userDoc, buttons, issueDesc);
}
