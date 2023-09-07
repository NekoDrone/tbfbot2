import * as http from "http";
import * as type from "./exports/types.ts";
import botStart from "./botStart.ts"
import generateCaseList from "./jira/generateCaseList.ts";
import authUserExistsInFirestore from "./firestore/firestoreUserExists.ts";
import getJiraIssue from "./jira/getJiraIssue.ts";
import printCaseDetails from "./printCaseDetails.ts";
import printCaseComments from "./printCaseComments.ts";
import getDocFromFirestore from "./firestore/get/getDocFromFirestore.ts";
import logOut from "./logOut.ts";

const server = http.createServer();
server.listen()

async function requestHandler(req: type.TeleUpdate, res: string): Promise<void> {
    const userId = req.callback_query.from.id ?? req.message.from.id;
    if(await authUserExistsInFirestore(userId)) {
        const userDoc = await getDocFromFirestore(userId);
        if(updateIsQuery(req)) {
            const queryData = req.callback_query.data as type.Query;

            if(queryData == type.Query.PrintDetails) {
                printCaseDetails(userDoc.selectedCase);
            }
            else if(queryData == type.Query.PrintComments) {
                printCaseComments(userDoc.selectedCase)
            }
            else if(queryData == type.Query.AddComment) {
                //do AddComment
            }
            else if(queryData == type.Query.ChangeCaseStatus) {
                //do ChangeCaseStatus
            }
            else if(queryData == type.Query.LogOut) {
                logOut()
            }
            else {
                const issueId = queryData as string
                if(issueId.startsWith("TY-")) {
                    //TODO: update userDoc with selected issue.
                }
            }
        }
        else if(updateIsMessage(req)) {
            const messageText = req.message.text;
            if(messageText == "/start") {
                botStart(userId);
            }
        }
        else {
            //what to do if neither query or message?
        }
    }
    else {

    }
    
}

function updateIsQuery(update: type.TeleUpdate): boolean {
    return update.callback_query != undefined;
}

function updateIsMessage(update: type.TeleUpdate): boolean {
    return update.message != undefined;
}


