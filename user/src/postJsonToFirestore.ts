import * as functions from "@google-cloud/functions-framework";
import * as firestore from "@google-cloud/firestore";
const axios = require("axios");

const TELEGRAM_URL = process.env.TELEGRAM_URL ?? "";
const telegramFullURL =
  TELEGRAM_URL + (process.env.TELEGRAM_BOT_KEY ?? "") + "/sendMessage";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const PROJ_ID = process.env.PROJ_ID;
const COLLECTION_NAME: string = process.env.COLLECTION_NAME ?? "undefined";
const firestoreObject = new firestore.Firestore({
  projectId: PROJ_ID,
});

functions.http(
  "postJsonToFirestore",
  (req: functions.Request, res: functions.Response) => {
    const jsonData = req.body;
    console.log();
    console.log("Incoming stream received at " + Date.now());
    console.log("Request stream: " + JSON.stringify(jsonData));

    let newCasePronouns = "";
    for (const prns of jsonData.pronouns) {
      newCasePronouns += prns;
      newCasePronouns += ", ";
    }

    let newCaseIdentity = "";
    for (const gender of jsonData.gender) {
      newCaseIdentity += gender;
      newCaseIdentity += ", ";
    }

    const teleMessage = `Hello! A new case has been received. Please check your preferred platform for more details.\n\n A shortened version of these details is provided below.
    \n\nTelegram Handle: ${jsonData.telegramhandle}
    \nAge: ${findAgeFromBirthday(jsonData.dateofbirth)}
    \nPronouns: ${newCasePronouns}
    \nGender Identity: ${newCaseIdentity}`;

    const options = {
      chat_id: TELEGRAM_CHAT_ID,
      text: teleMessage,
    };

    console.info("Trying to send telegram message at: " + telegramFullURL);
    console.info("data = " + options);

    axios
      .post(telegramFullURL, options)
      .then(function (response: any) {
        console.log(response);
        res.send({ status: "OK" });
      })
      .catch(function (error: any) {
        console.error(error);
        res.sendStatus(500);
      });

    firestoreObject
      .collection(COLLECTION_NAME)
      .add(jsonData)
      .then((doc) => {
        console.info("Stored new case at id#: ", doc.id);
        return res.status(200).send(doc);
      })
      .catch((err) => {
        console.error(err);
        return res.status(404).send({
          error: "Something went wrong. Unable to store new case data.",
          err,
        });
      });
  }
);

function findAgeFromBirthday(dateOfBirth: any): number {
  const datenow: number = Date.now();
  const dob: number = new Date(
    `${dateOfBirth.month}/${dateOfBirth.day}/${dateOfBirth.year}`
  ).getTime();
  return Math.floor((datenow - dob) / 31556952000);
}
