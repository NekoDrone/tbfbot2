import * as functions from "@google-cloud/functions-framework";
import * as firestore from "@google-cloud/firestore";

functions.http('collectNewCaseData', (req: functions.Request, res: functions.Response) => {
    const store = new firestore.Firestore();
    const reqBody: FormData = req.body;
    console.log("Incoming stream: " + reqBody);
    const jsonData: any = Object.fromEntries(reqBody);
    console.log(jsonData);
    console.log(jsonData.telegramhandle);
    console.log(jsonData[4])
    //initialiseFirestore(store); ????????????????
  res.send(`Hello ${req.query.name || req.body.name || 'World'}!`);
});

