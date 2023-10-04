import axios from "axios";
import { JIRA_URL, jiraCredentials } from "../exports/consts";
import { AuthUser } from "../exports/types";

/**
 * Adds a comment to the case in the Authorised User's selected case.
 * @param userDoc - An object of type AuthUser that contains both the comment, and the case label it should apply to.
 */
export async function addCommentToCase(userDoc: AuthUser): Promise<void> {
    const auth = `Basic ${jiraCredentials}`;
    console.log(`Attempting to pull case details from Jira using bearer token: ${auth}`);
    const header = {
        Authorization: auth,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const newComment = {
        content: [
            {
                content: [
                    {
                        text: `${userDoc.inputString}`,
                        type: "text",
                    },
                ],
                type: "paragraph",
            },
        ],
        type: "doc",
        version: 1,
    };
    axios({
        method: "POST",
        url: JIRA_URL + `/${userDoc.selectedCase}/comment`,
        headers: header,
        data: newComment,
    });
}
