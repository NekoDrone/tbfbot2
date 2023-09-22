import { AuthUser, JiraStatusId } from "../../exports/types";
import changeJiraCaseStatus from "../../jira/changeJiraCaseStatus";
import startAddingComment from "../../telegram/userInput/startAddingComment";

export default function escalateCase(userDoc: AuthUser) {
  changeJiraCaseStatus(userDoc.selectedCase, JiraStatusId.EscalateCase);
  startAddingComment(userDoc); // there might be a problem here if they cancel after they select escalate. Need to rethink flow.
}
