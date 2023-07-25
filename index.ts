import * as functions from "@google-cloud/functions-framework";
import * as firestore from "@google-cloud/firestore";
import axios from "axios";

const projectID = 'tbfcms2';

functions.http('postJsonToFirestore', (req: functions.Request, res: functions.Response) => {

  const jsonData = req.body;
  console.log();
  console.log("Incoming stream received at " + Date.now());
  console.log("Request stream: " + JSON.stringify(jsonData));

  const TELEGRAM_URL = process.env.TELEGRAM_URL ?? "";
  const telegramFullURL = TELEGRAM_URL + (process.env.TELEGRAM_BOT_KEY ?? "") + "/sendMessage";
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  var newCasePronouns = "";
  for(const prns of jsonData.pronouns) {
    newCasePronouns += prns;
    newCasePronouns += ",";
  }

  var newCaseIdentity = "";
  for(const gender of jsonData.gender) {
    newCaseIdentity += gender;
    newCaseIdentity += ",";
  }

  const teleMessage = "Hello! A new case has been received. Please check your preferred platform for more details.\n\n A shortened version of these details is provided below.\n\nTelegram Handle: " + jsonData.telegramhandle + "\nAge: " + jsonData.age + "\nPronouns: " + newCasePronouns + "\nGender Identity: " + newCaseIdentity;
  const options = {
    chat_id: TELEGRAM_CHAT_ID,
    text: teleMessage
    }

  console.info("Trying to send telegram message at: " + telegramFullURL);
  console.info("data = " + options);
  
  axios.post(telegramFullURL, options)
  .then(function (response) {
    console.log(response);
    res.send({ status: 'OK'});
  })
  .catch(function (error) {
    console.error(error);
    res.sendStatus(500);
  });
  
  const PROJ_ID = process.env.PROJ_ID;
  const COLLECTION_NAME: string = process.env.COLLECTION_NAME ?? 'undefined';
  

  const firestoreObject = new firestore.Firestore({
    projectId: PROJ_ID
  });

  firestoreObject.collection(COLLECTION_NAME).add(jsonData)
    .then(doc => {
      console.info('Stored new case at id#: ', doc.id);
      return res.status(200).send(doc);
      })
    .catch(err => {
    console.error(err);
    return res.status(404).send({
      error: 'Something went wrong. Unable to store new case data.',
      err
      });
    });
});