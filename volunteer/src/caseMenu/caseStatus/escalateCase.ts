import { AuthUser, JiraStatusId } from "../../exports/types";
import changeJiraCaseStatus from "../../jira/changeJiraCaseStatus";
import startAddingComment from "../../telegram/userInput/startAddingComment";

export default function escalateCase(userDoc: AuthUser) {
    changeJiraCaseStatus(userDoc.selectedCase, JiraStatusId.EscalateCase); //befriender shouldn't be able to close case on their own. Submit closure request.
    startAddingComment(userDoc); // there might be a problem here if they cancel after they select escalate. Need to rethink flow.
}
