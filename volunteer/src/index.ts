import express, { Response } from "express";
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

const app = express();
app.post("/", (req, res) => requestHandler(req.body, res));
app.listen(3000); //TODO: Express and routing

async function requestHandler(req: type.TeleUpdate, res: Response): Promise<void> {
    const userId = req.callback_query.from.id ?? req.message.from.id;
    if (await authUserExists(userId)) {
        const user = await getDocFromFirestore(userId);

        if (updateIsQuery(req)) {
            const queryData = req.callback_query.data as type.Query;

            if (queryData == type.Query.PrintDetails) {
                printCaseDetailsTo(user);
            } else if (queryData == type.Query.PrintComments) {
                printCaseCommentsTo(user);
            } else if (queryData == type.Query.AddComment) {
                startAddingComment(user);
            } else if (queryData == type.Query.ChangeCaseStatus) {
                startChangingCaseStatus(user);
            } else if (queryData == type.Query.Back) {
                botStart(user);
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
                    updateUserSelectedCase(user.telegramId, issueId);
                    startCaseMenu(user);
                }
            }

            answerCallbackQuery(req.callback_query.id);
        } else if (updateIsMessage(req)) {
            const messageText = req.message.text;

            if (messageText == "/start") {
                botStart(user);
            } else {
                handleStringInput(messageText, user);
                feedbackCommentToUser(messageText, user);
            }
        }
    } else {
        const newUser = (await (await registerNewUser(req)).get()).data() as type.AuthUser;
        botStart(newUser);
    }
    res.sendStatus(200);
}

function updateIsQuery(update: type.TeleUpdate): boolean {
    return update.callback_query != undefined;
}

function updateIsMessage(update: type.TeleUpdate): boolean {
    return update.message != undefined;
}
