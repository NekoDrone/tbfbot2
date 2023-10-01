import { caseStatusCollection } from "../exports/consts";
import { CaseStatusChangeReq, JiraStatusId } from "../exports/types";

export default function reqChangeCaseStatus(caseLabel: string, newStatus: JiraStatusId) {
    const data: CaseStatusChangeReq = {
        caseLabel: caseLabel,
        newStatus: newStatus,
        approved: false,
    };
    caseStatusCollection.add(data);
}
