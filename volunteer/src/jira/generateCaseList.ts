import axios from "axios"
import { JiraIssue } from "../exports/types.ts"
import { JIRA_URL, jiraCredentials } from "../exports/consts.ts";

/**
 * Calls the Jira API to find the cases associated with a given label on Jira.
 * @param {string} jiraLabel - The label of the user.
 * @returns A promise containing a string array of the keys of the cases.
 */

export default async function generateCaseList(jiraLabel: string): Promise<string[]> {
    const issues = await retrieveCaseListFromJira(jiraLabel);
    var caseLabels: string[] = [];
    for (const issue of issues) {
        caseLabels.push(issue.key);
    }
    return caseLabels;
}

async function retrieveCaseListFromJira(jiraLabel: string): Promise<JiraIssue[]> {
    const header = {
        'Authorization': "Basic " + jiraCredentials,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    const jiraIssues: JiraIssue[] = await axios({
        method: "GET",
        url: JIRA_URL + "/search",
        headers: header,
        params: {
            jql: `status = "Assigned Cases" and labels = ${jiraLabel}`
        }
    })
    return Promise.resolve(jiraIssues)
}

function generateLabelsFromArray(issuesArray: JiraIssue[]) {
    var caseLabels: string[] = [];
    for (const issue of issuesArray) {
        caseLabels.push(issue.key)
    }
}