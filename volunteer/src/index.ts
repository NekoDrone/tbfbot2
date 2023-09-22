import * as http from "http";
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

const server = http.createServer();
server.listen();

async function requestHandler(
  req: type.TeleUpdate,
  res: string
): Promise<void> {
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
        //TODO: ChangeCaseStatus
      } else if (queryData == type.Query.Back) {
        botStart(user);
      } else if (queryData == type.Query.Cancel) {
        startCaseMenu(user);
      } else if (queryData == type.Query.LogOut) {
        logOut(user); //TODO:
      } else if (queryData == type.Query.Edit) {
        clearUserInput(user);
        startAddingComment(user);
      } else if (queryData == type.Query.Confirm) {
        finishAddingComment(user);
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
    } else {
      //what to do if neither query or message?
    }
  } else {
    //reject query
  }
}

function updateIsQuery(update: type.TeleUpdate): boolean {
  return update.callback_query != undefined;
}

function updateIsMessage(update: type.TeleUpdate): boolean {
  return update.message != undefined;
}
