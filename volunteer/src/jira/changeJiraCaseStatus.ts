import axios from "axios";
import { JIRA_URL, jiraCredentials } from "../exports/consts";
import { JiraStatusId } from "../exports/types";

export default function changeJiraCaseStatus(
  caseLabel: string,
  newStatus: JiraStatusId
) {
  const header = {
    Authorization: "Basic " + jiraCredentials,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const body = {
    transition: {
      id: newStatus,
    },
  };
  axios({
    method: "POST",
    url: JIRA_URL + `/${caseLabel}/transitions`,
    headers: header,
    data: body,
  });
}
