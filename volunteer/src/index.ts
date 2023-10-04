import * as functions from "@google-cloud/functions-framework";
import * as type from "./exports/types";
import botStart from "./botStart";
import authUserExists from "./firestore/authUserExists";
import getDocFromFirestore from "./firestore/get/getDocFromFirestore";
import logOut from "./caseMenu/logOut";
import updateUserSelectedCase from "./firestore/docupdates/updateUserSelectedCase";
import printCaseDetailsTo from "./caseMenu/printCaseDetailsTo";
import printCaseCommentsTo from "./caseMenu/printCaseCommentsTo";
import startAddingComment from "./telegram/userInput/startAddingComment";
import feedbackCommentToUser from "./telegram/userInput/feedbackCommentToUser";
import handleStringInput from "./telegram/userInput/handleStringInput";
import finishAddingComment from "./telegram/userInput/finishAddingComment";
import answerCallbackQuery from "./telegram/answerCallbackQuery";
import clearUserInput from "./telegram/userInput/clearUserInput";
import startCaseMenu from "./caseMenu/startCaseMenu";
import botInfo from "./caseMenu/botInfo";
import startChangingCaseStatus from "./caseMenu/caseStatus/startChangingCaseStatus";
import closeCase from "./caseMenu/caseStatus/closeCase";
import escalateCase from "./caseMenu/caseStatus/escalateCase";
import registerNewUser from "./registerNewUser";

functions.http("volunteerBot", async (req, res) => {
    const reqBody = req.body;
    console.log("Request received. Processing.");
    const updateType = reqBody.callback_query ?? reqBody.message;
    const userId = updateType.from.id;
    console.log(`Update received from ID: ${userId}`);
    if (await authUserExists(userId)) {
        console.log("User exists! :D");
        const user = await getDocFromFirestore(userId);
        console.log(`User ${userId} exists.`);
        if (updateIsQuery(reqBody)) {
            console.log(`Update is Query. Extracting query data.`);
            const queryData = reqBody.callback_query.data as type.Query;
            console.log(`Query data found: ${queryData}`);
            if (queryData == type.Query.PrintDetails) {
                printCaseDetailsTo(user);
            } else if (queryData == type.Query.PrintComments) {
                printCaseCommentsTo(user);
            } else if (queryData == type.Query.AddComment) {
                startAddingComment(user);
            } else if (queryData == type.Query.ChangeCaseStatus) {
                startChangingCaseStatus(user);
            } else if (queryData == type.Query.Back) {
                botStart(user); //TODO: Don't do this. This creates a new instance with a new message. You need to go back without starting a new instance.
            } else if (queryData == type.Query.Cancel) {
                startCaseMenu(user);
            } else if (queryData == type.Query.LogOut) {
                logOut(user);
            } else if (queryData == type.Query.Edit) {
                clearUserInput(user);
                startAddingComment(user);
            } else if (queryData == type.Query.Confirm) {
                finishAddingComment(user);
            } else if (queryData == type.Query.Info) {
                botInfo(user);
            } else if (queryData == type.Query.EscalateCase) {
                escalateCase(user);
            } else if (queryData == type.Query.CloseCase) {
                closeCase(user);
            } else {
                const issueId = queryData as string;
                if (issueId.startsWith("TY-")) {
                    updateUserSelectedCase(user, issueId);
                    startCaseMenu(user);
                }
            }
            answerCallbackQuery(reqBody.callback_query.id);
        } else if (updateIsMessage(reqBody)) {
            console.log(`Update is a message. Extracting message text.`);
            const messageText = reqBody.message.text;
            console.log(`Message text found: ${messageText}`);
            if (messageText == "/start") {
                botStart(user);
            } else {
                console.log("User doesn't exist :(");
                console.log("Attempting to register new user");
                handleStringInput(messageText, user);
                feedbackCommentToUser(messageText, user);
            }
        }
    } else {
        console.log("User doesn't exist :(");
        const newUser = (await (await registerNewUser(reqBody)).get()).data() as type.AuthUser;
        botStart(newUser);
    }
    res.sendStatus(200);
});

function updateIsQuery(update: type.TeleUpdate): boolean {
    return update.callback_query != undefined;
}

function updateIsMessage(update: type.TeleUpdate): boolean {
    return update.message != undefined;
}
