import * as http from "http";
import * as type from "./exports/types.ts";
import botStart from "./botStart.ts"
import authUserExists from "./firestore/authUserExists.ts";
import getDocFromFirestore from "./firestore/get/getDocFromFirestore.ts";
import logOut from "./caseMenu/logOut.ts";
import updateUserSelectedCase from "./firestore/docupdates/updateUserSelectedCase.ts";
import printCaseDetailsTo from "./caseMenu/printCaseDetailsTo.ts";
import printCaseCommentsTo from "./caseMenu/printCaseCommentsTo.ts";

const server = http.createServer();
server.listen()

async function requestHandler(req: type.TeleUpdate, res: string): Promise<void> {
    const userId = req.callback_query.from.id ?? req.message.from.id;
    if(await authUserExists(userId)) {
        const user = await getDocFromFirestore(userId);
        if(updateIsQuery(req)) {
            const queryData = req.callback_query.data as type.Query;

            if(queryData == type.Query.PrintDetails) {
                printCaseDetailsTo(user)
            }
            else if(queryData == type.Query.PrintComments) {
                printCaseCommentsTo(user)
            }
            else if(queryData == type.Query.AddComment) {
                //TODO: AddComment
            }
            else if(queryData == type.Query.ChangeCaseStatus) {
                //TODO: ChangeCaseStatus
            }
            else if(queryData == type.Query.Back) {
                botStart(user);
            }
            else if(queryData == type.Query.LogOut) {
                logOut(user) //TODO:
            }
            else {
                const issueId = queryData as string
                if(issueId.startsWith("TY-")) {
                    updateUserSelectedCase(user.telegramId, issueId)
                    //TODO: case management menu
                }
            }
        }
        else if(updateIsMessage(req)) {
            const messageText = req.message.text;
            if(messageText == "/start") {
                botStart(user);
            }
            else {
                //handle text input
            }
        }
        else {
            //what to do if neither query or message?
        }
    }
    else {
        //reject query
    }
    
}

function updateIsQuery(update: type.TeleUpdate): boolean {
    return update.callback_query != undefined;
}

function updateIsMessage(update: type.TeleUpdate): boolean {
    return update.message != undefined;
}


