import axios from 'axios';
import * as firestore from '@google-cloud/firestore';
const functions = require('@google-cloud/functions-framework');
const protobuf = require('protobufjs');
const firestoreParser = require('firestore-parser');

const TELEGRAM_URL = process.env.TELEGRAM_URL ?? "";
const telegramSendURL = TELEGRAM_URL + (process.env.TELEGRAM_BOT_KEY ?? "") + "/sendMessage";
const PROJ_ID = process.env.PROJ_ID;

const tempFirestoreCollection = new firestore.Firestore({// put up here because of how functions are instantiated. improves response times.
    projectId: PROJ_ID
}).collection("cms2-temp-db");
const protobufRoot = protobuf.loadSync('data.proto');
const DocumentEventData = protobufRoot.lookupType(
  'google.events.cloud.firestore.v1.DocumentEventData'
);

functions.cloudEvent('sendNewCaseConfirmation', async (cloudEvent: any) => {
  console.log(`Function triggered by event on: ${cloudEvent.source}`);
  console.log(`Event type: ${cloudEvent.type}`);

  
  const eventData = DocumentEventData.decode(cloudEvent.data);
  console.log('Decoding data finished.');

  const firestoreNewDocument = firestoreParser(eventData.value.fields);
  console.log(JSON.stringify(firestoreNewDocument, null, 2));
  const newCaseFirstName = firestoreNewDocument.name.first;
  const confirmationMessage = `Hello ${newCaseFirstName}! Thanks for filling up the form.\n\nIn the next few days, you will receive a message from either your assigned Befriender, or a member of our committe who may be asking some follow-up questions based on your request.\n\nIf you do not receive any confirmation within the next two weeks, please contact us at @TransBefrienders on telegram, and we will respond as soon as we can.\n\nThank you for your trust in us and have a good day ahead.`
  const userID: number = await findUserIdFromTempStore(firestoreNewDocument.telegramhandle);
  sendMessageToUserId(confirmationMessage, userID);
});

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

async function findUserIdFromTempStore(username: string): Promise<number> {
  const lookupResults = await tempFirestoreCollection.where('username', '==', username).get();
  const tempData = lookupResults.docs[0].data();
  return tempData.userid ?? 0;
}