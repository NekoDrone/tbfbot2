import express, { Response } from "express";
import * as type from "./exports/types";
import adminUserExists from "./firestore/adminUserExists";
import sendMessageToUserId from "./telegram/sendMessageToUserId";
import answerCallbackQuery from "./telegram/answerCallbackQuery";
import getDocFromFirestore from "./firestore/getDocFromFirestore";

const app = express();
app.post("/", (req, res) => requestHandler(req.body, res));
app.listen(3000); //TODO: Express and routing

async function requestHandler(reqBody: type.TeleUpdate, res: Response) {
    const userId = reqBody.callback_query.from.id ?? reqBody.message.from.id;
    if (await adminUserExists(userId)) {
        const user = await getDocFromFirestore(userId);
        if (updateIsQuery(reqBody)) {
            const queryData = reqBody.callback_query.data;
            answerCallbackQuery(reqBody.callback_query.id);
            if(queryData == type.Query)
        }
        else if (updateIsMessage(reqBody)) {
            const messageText = reqBody.message.text
            if(messageText == "/start") {

            }
        }

    } else {
        const rejectUserText = "You are unauthorised.";
        sendMessageToUserId(rejectUserText, userId);
    }
    res.sendStatus(200);
}

function updateIsQuery(update: type.TeleUpdate): boolean {
    return update.callback_query != undefined;
}

function updateIsMessage(update: type.TeleUpdate): boolean {
    return update.message != undefined;
}
