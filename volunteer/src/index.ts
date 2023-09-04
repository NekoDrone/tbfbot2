import * as http from "http";
import botStart from "./botStart.ts"
import generateCaseList from "./jira/generateCaseList.ts";
import authUserExistsInFirestore from "./firestore/firestoreUserExists.ts";
import * as firestore from "@google-cloud/firestore";

const PROJ_ID = process.env.PROJ_ID;
const AUTH_USERS_COLLECTION_NAME: string = process.env.AUTH_USERS_COLLECTION_NAME ?? "undefined";
export const TELEGRAM_URL = process.env.TELEGRAM_URL ?? "";
export const TELEGRAM_BOT_KEY = process.env.TELEGRAM_BOT_KEY ?? "";
export const firestoreObject = new firestore.Firestore({
    projectId: PROJ_ID
  })
export const firestoreCollection = firestoreObject.collection(AUTH_USERS_COLLECTION_NAME);

const server = http.createServer();
server.listen()

async function requestHandler(req: TeleUpdate, res: string): Promise<void> {
    const queryData = req.callback_query.data;
    const userid = req.callback_query.from.id ?? req.message.from.id;
    if(queryData != undefined) {
        //do callback query stuff
    }
    else {
        const messageText = req.message.text;
        if(messageText == "/start") {
            if(await authUserExistsInFirestore(userid)) {
                botStart()
            }
        }
    }
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