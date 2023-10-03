import * as functions from "@google-cloud/functions-framework";

functions.cloudEvent("sendCaseChangeReq", (cloudEvent: any) => {
    //when case change is created, send update to TBF account.
});
