import * as http from "http";
import botStart from "./botStart.ts"
import generateCaseList from "./jira/generateCaseList.ts";
import authUserExistsInFirestore from "./firestore/firestoreUserExists.ts";
import * as firestore from "@google-cloud/firestore";
import getSelectedIssue from "./firestore/getSelectedIssue.ts";
import printCaseDetails from "./printCaseDetails.ts";

const PROJ_ID = process.env.PROJ_ID;
const AUTH_USERS_COLLECTION: string = process.env.AUTH_USERS_COLLECTION ?? "undefined";
export const TELEGRAM_URL = process.env.TELEGRAM_URL ?? "";
export const TELEGRAM_BOT_KEY = process.env.TELEGRAM_BOT_KEY ?? "";
export const firestoreObject = new firestore.Firestore({
    projectId: PROJ_ID
  })
export const firestoreCollection = firestoreObject.collection(AUTH_USERS_COLLECTION);

const server = http.createServer();
server.listen()

async function requestHandler(req: TeleUpdate, res: string): Promise<void> {
    const userid = req.callback_query.from.id ?? req.message.from.id;
    if(updateIsQuery(req)) {
        const queryData = req.callback_query.data as Query;
        if(queryData == Query.PrintDetails) {
            printCaseDetails(await getSelectedIssue(userid));
        }
        else if(queryData == Query.PrintComments) {

        }
        else if(queryData == Query.AddComment) {

        }
        else if(queryData == Query.ChangeCaseStatus) {

        }
        else if(queryData == Query.LogOut) {

        }
    }
    else if(updateIsMessage(req)) {
        const messageText = req.message.text;
        if(messageText == "/start") {
            if(await authUserExistsInFirestore(userid)) {
                botStart()
            }
        }
    }
    else {
        //what to do if neither query or message?
    }
}

function updateIsQuery(update: TeleUpdate): boolean {
    return update.callback_query != undefined;
}

function updateIsMessage(update: TeleUpdate): boolean {
    return update.message != undefined;
}

export type TeleUpdate = {
    update_id: string,
    message: Message,
    callback_query: CallbackQuery
}

export type Message = {
    from: User,
    text: string
}

export type User = {
    id: number,
    username: string
}

export type CallbackQuery = {
    from: User,
    data: string,
    message: Message
}

export enum Query {
    PrintDetails = "PrintDetails",
    PrintComments = "PrintComments",
    AddComment = "AddComment",
    ChangeCaseStatus = "ChangeCaseStatus",
    LogOut = "LogOut"
}


