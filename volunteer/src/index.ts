import * as http from "http";
import botStart from "./botStart.ts"
import generateCaseListPromise from "./generateCaseList.ts";
import * as Firestore from "@google-cloud/firestore";

const server = http.createServer();
server.listen()
const firestoreCollection = Firestore.CollectionReference //store firestore reference here

function requestHandler(req: TeleUpdate, res: string): void {
    const queryData = req.callback_query.data;
    
    if(queryData != null) {
        //do callback query stuff
    }
    else {
        const messageText = req.message.text;
        //do message stuff
    }
}

type TeleUpdate = {
    update_id: string,
    message: Message,
    callback_query: CallbackQuery
}

type Message = {
    from: User,
    text: string
}

type User = {
    id: number,
    username: string
}

type CallbackQuery = {
    from: User,
    data: string,
    message: Message
}