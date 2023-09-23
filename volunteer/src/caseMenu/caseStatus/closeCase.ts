import { AuthUser, JiraStatusId } from "../../exports/types";
import changeJiraCaseStatus from "../../jira/changeJiraCaseStatus";
import startAddingComment from "../../telegram/userInput/startAddingComment";

export default function closeCase(userDoc: AuthUser) {
    changeJiraCaseStatus(userDoc.selectedCase, JiraStatusId.CloseCase);
    startAddingComment(userDoc);
}
