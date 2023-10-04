import { AuthUser } from "./exports/types";
import generateCaseList from "./jira/generateCaseList";
import editMessageWithInlineButtons from "./telegram/editMessageWithInlineButtons";

export default async function backToStart(userDoc: AuthUser) {
    console.log("Going back to start.");
    const casesList = await generateCaseList(userDoc.jiraLabel);
    const message = `Hello ${userDoc.name}! Please choose a case from the list below:`;
    editMessageWithInlineButtons(userDoc, casesList, message);
}
