import axios from "axios"

const jiraUrl = process.env.JIRA_URL ?? 'undefined';
const jiraKey = process.env.JIRA_KEY ?? 'undefined';
const jiraEmail = process.env.JIRA_EMAIL ?? 'undefined';
const jiraCredentials = Buffer.from(jiraEmail + ":" + jiraKey, 'base64')

export default async function generateCaseListPromise(jiraLabel: string): Promise<string[]> {
    const issues = await retrieveCaseListFromJira(jiraLabel);
    var caseLabels: string[] = [];
    for (const issue of issues) {
        caseLabels.push(issue.someProperty);
    }
    return caseLabels;
}

async function retrieveCaseListFromJira(jiraLabel: string): Promise<JiraIssue[]> {
    const header = {
        'Authorization': "Basic " + jiraCredentials,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    var jiraIssues: Array<JiraIssue> = new Array<JiraIssue>
    return await axios({
        method: "GET",
        url: jiraUrl + "/search",
        headers: header,
        params: {
            jql: `status = "Assigned Cases" and labels = ${jiraLabel}`
        }
    }).then((response) => {
        jiraIssues = response.data.issues
        return jiraIssues
    })
}

type JiraIssue = {
    someProperty: string
}