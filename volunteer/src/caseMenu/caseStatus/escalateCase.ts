import { AuthUser, JiraStatusId } from "../../exports/types";
import reqChangeCaseStatus from "../../jira/reqChangeCaseStatus";
import startAddingComment from "../../telegram/userInput/startAddingComment";

export default function escalateCase(userDoc: AuthUser) {
    startAddingComment(userDoc); // there might be a problem here if they cancel after they select escalate. Need to rethink flow.
    reqChangeCaseStatus(userDoc.selectedCase, JiraStatusId.EscalateCase); //befriender shouldn't be able to close case on their own. Submit closure request.
}
