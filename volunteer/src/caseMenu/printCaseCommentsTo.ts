import { AuthUser, JiraCommentInner } from "../exports/types";
import getJiraIssue from "../jira/getJiraIssue";
import editMessageWithInlineButtons from "../telegram/editMessageWithInlineButtons";

/**
 * Sends the case comments of the specified issue to the telegram bot.
 * @param userDoc - An object of type AuthUser that contains the state of the conversation.
 */
export default async function printCaseCommentsTo(
  userDoc: AuthUser
): Promise<void> {
  const jiraIssue = await getJiraIssue(userDoc.selectedCase);
  const buttons = ["Back"];
  const issueComments = jiraIssue.fields.comment.comments;
  const messageText: string = issueArrayToParagraphs(issueComments);
  editMessageWithInlineButtons(userDoc, buttons, messageText);
}

function issueArrayToParagraphs(arr: JiraCommentInner[]): string {
  let res = "";
  for (const paragraph of arr) {
    const date = new Date(paragraph.created);
    res += `${date.toDateString()} - `;
    res += paragraph.body.content[0].content[0].text;
    res += "\n\n";
  }
  return res;
}
