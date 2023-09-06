import * as firestore from "@google-cloud/firestore"
import getDocFromFirestore from "./firestore/get/getDocFromFirestore"
import sendMessageToUserId from "./telegram/sendMessageToUserId"
import generateCaseList from "./jira/generateCaseList"
import editMessageWithInlineButtons from "./telegram/editMessageWithInlineButtons"

export default function botStart(userId: number): void {
    const botIsStartingMessage = "Befriending CMS Bot 2.0 Loading..."
    sendMessageToUserId(botIsStartingMessage, userId)
    getDocFromFirestore(userId)
    .then((userDoc) => {
        generateCaseList(userDoc.jiraLabel)
        .then((casesList) => {
            editMessageWithInlineButtons(userId, messageId, casesList)
        })
    })
    // generateCaseList(userDoc.jiraLabel);
}