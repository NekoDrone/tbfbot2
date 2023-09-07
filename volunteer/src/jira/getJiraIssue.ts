import axios from "axios";
import { JIRA_URL, jiraCredentials } from "../exports/consts";
import { JiraIssue } from "../exports/types";

/**
 * Calls the Jira API to get an issue based on the given issue Key
 * @param {string} issueKey - The issue key
 * @returns A promise containing a JiraIssue object.
 */

export default async function getJiraIssue(issueKey: string): Promise<JiraIssue> {
    const header = {
        'Authorization': "Basic " + jiraCredentials,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    const issue: JiraIssue = await axios({
        method: "GET",
        url: JIRA_URL + `/${issueKey}`,
        headers: header
    })
    return Promise.resolve(issue)
}
