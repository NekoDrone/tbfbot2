import axios from "axios";
import { JiraIssue } from "../exports/types";
import { JIRA_URL, jiraCredentials } from "../exports/consts";

/**
 * Calls the Jira API to find the cases associated with a given label on Jira.
 * @param {string} jiraLabel - The label of the user.
 * @returns A promise containing a string array of the keys of the cases.
 */

export default async function generateCaseList(jiraLabel: string): Promise<string[]> {
    const issues = await retrieveCaseListFromJira(jiraLabel);
    return generateLabelsFromArray(issues);
}

async function retrieveCaseListFromJira(jiraLabel: string): Promise<JiraIssue[]> {
    const auth = `Basic ${jiraCredentials}`;
    console.log(`Attempting to pull case details from Jira using bearer token: ${auth}`);
    const header = {
        Authorization: auth,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const jiraIssues: JiraIssue[] = (
        await axios({
            method: "GET",
            url: JIRA_URL + "/search",
            headers: header,
            params: {
                jql: `status = "Assigned Cases" and labels = ${jiraLabel}`,
            },
        })
    ).data.issues;
    console.log(`Received issues: ${JSON.stringify(jiraIssues)}`);
    return Promise.resolve(jiraIssues);
}

function generateLabelsFromArray(issuesArray: JiraIssue[]): string[] {
    const caseLabels: string[] = [];
    for (const issue of issuesArray) {
        caseLabels.push(issue.key);
    }
    console.log(JSON.stringify(caseLabels));
    return caseLabels;
}
