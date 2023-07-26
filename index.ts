import * as functions from '@google-cloud/functions-framework';
import * as firestore from '@google-cloud/firestore';
import axios from 'axios';

const PROJ_ID = process.env.PROJ_ID;
const COLLECTION_NAME: string = process.env.COLLECTION_NAME ?? 'undefined';
const firestoreCollection = new firestore.Firestore({// put up here because of how functions are instantiated. improves response times.
    projectId: PROJ_ID
}).collection(COLLECTION_NAME);
const TELEGRAM_URL = process.env.TELEGRAM_URL ?? "";
const telegramSendURL = TELEGRAM_URL + (process.env.TELEGRAM_BOT_KEY ?? "") + "/sendMessage";
const NEW_CASE_FORM_URL = process.env.NEW_CASE_FORM_URL;

functions.http('newCaseHello', async (req: functions.Request, res: functions.Response) => {
    const updateObject = req.body;
    const teleUser = '@' + updateObject.message.chat.username;
    const teleUserId = updateObject.message.chat.id;
    if(await userExistsinFirestore(teleUser)) {
      console.log("User found! Sending rejection.");
      sendAlreadyRegisteredMessage(teleUserId);
      res.sendStatus(200);
    }
    else {
      console.log("User not found. Sending form.");
      sendNewRegistrationMessage(teleUserId, teleUser);
      res.sendStatus(200);
    }

})

async function userExistsinFirestore(teleUser: string) {
    const caseData = await firestoreCollection.where('telegramhandle', '==', teleUser).get();
    return !caseData.empty;
}

function sendAlreadyRegisteredMessage(userId: number) {
    const message = "Thanks for reaching out.\n\nIf you have any other issues you would like to raise, please do so through your befriender. If you feel uncomfortable doing so, you may leave a message with @transbefrienders.\n\nThank you and have a nice day!";
    sendMessageToUserId(message, userId);
}

function sendNewRegistrationMessage(userId: number, username: string) {
    const message = `Hello ${username}!\n\nThank you for reaching out to TransBefrienders' peer support service. We use this telegram bot to process your request, and to give you updates on your case should there be a need to do so.\n\nPlease fill up this form to the best of your ability. This is for us to know you better and a case manager will contact you after your application is processed. Any information you have submit through the form will be kept strictly confidential.\n\n${NEW_CASE_FORM_URL}\n\nYou will receive a confirmation message after you submit the form.`;
    sendMessageToUserId(message, userId);
}

function sendMessageToUserId(message: string, userId: number) {
    const options = {
        chat_id: userId,
        text: message
    }
    axios.post(telegramSendURL, options)
    .then(function (response: any) {
      console.log(response);
    })
    .catch(function (error: any) {
      console.error(error);
    });
}