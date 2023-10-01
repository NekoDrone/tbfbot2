import { AuthUser, JiraStatusId } from "../../exports/types";
import reqChangeCaseStatus from "../../jira/reqChangeCaseStatus";
import startAddingComment from "../../telegram/userInput/startAddingComment";

export default function closeCase(userDoc: AuthUser) {
    reqChangeCaseStatus(userDoc.selectedCase, JiraStatusId.CloseCase);
    startAddingComment(userDoc);
}
