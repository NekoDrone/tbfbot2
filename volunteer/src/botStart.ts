import * as firestore from "@google-cloud/firestore"
import getDocFromFirestore, { AuthUser } from "./firestore/get/getDocFromFirestore"
import sendMessageToUserId from "./telegram/sendMessageToUserId"
import generateCaseList from "./jira/generateCaseList"
import editMessageWithInlineButtons from "./telegram/editMessageWithInlineButtons"

export default async function botStart(userId: number): Promise<void> {
    const botIsStartingMessage = "Befriending CMS Bot 2.0 Loading..."
    sendMessageToUserId(botIsStartingMessage, userId)
    getDocFromFirestore(userId)
    .then((userDoc) => {
        generateCaseList(userDoc.jiraLabel)
        .then(async (casesList) => {
            const messageId: number = (await getDocFromFirestore(userId)).sessionMessageId;
            editMessageWithInlineButtons(userId, messageId, casesList)
        })
    })
    // generateCaseList(userDoc.jiraLabel);
}