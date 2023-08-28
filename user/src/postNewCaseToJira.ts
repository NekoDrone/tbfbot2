import axios from 'axios';
import * as firestoreParser from 'firestore-parser';
import * as functions from '@google-cloud/functions-framework';
import protobuf from 'protobufjs';

const jiraURL = process.env.JIRA_URL ?? 'undefined';
const jiraKey = process.env.JIRA_KEY ?? 'undefined';
const jiraEmail = process.env.JIRA_EMAIL ?? 'undefined';
const jiraCredentials = Buffer.from(jiraEmail + ":" + jiraKey, 'base64')

const protobufRoot = protobuf.loadSync('data.proto');
const protobufEventType = protobufRoot.lookupType(
    'google.events.cloud.firestore.v1.DocumentEventData'
);

functions.cloudEvent('postNewCaseToJira', async (cloudEvent: any) => {
    const eventData = decodeEventDataToJson(cloudEvent.data);
    const firestoreNewDocument = firestoreParser(eventData.value.fields);
    console.log("New Case Created.");
    console.log(JSON.stringify(firestoreNewDocument, null, 2));
    const jiraIssue = constructJiraIssue(firestoreNewDocument)
    sendToJira(jiraIssue);
});

function decodeEventDataToJson(eventData: any) {
    const data = protobufEventType.decode(eventData);
    const decodedData = protobuf.Message.toObject(data);
    console.log('Decoding data finished.');
    return firestoreParser(decodedData.value.fields);
}

function constructJiraIssue(caseData): Object {
    var issueDescription = `Timestamp: ${new Date().toLocaleString()}` + "\n";
    issueDescription += `Name: ${caseData.name.first} ${caseData.name.last}` + "\n";
    issueDescription += `Pronouns: ${arrayToString(caseData.pronouns, ", ")}` + "\n";
    issueDescription += `Gender: ${arrayToString(caseData.gender, ", ")}` + "\n";
    issueDescription += `Sexual Orientation: ${caseData.sexualorientation}` + "\n";
    issueDescription += `Date of Birth: ${caseData.dateofbirth.day}/${caseData.dateofbirth.month}/${caseData.dateofbirth.year}` + "\n";
    issueDescription += `Email: ${caseData.email}` + "\n";
    issueDescription += `Telegram: ${caseData.telegramhandle}` + "\n";
    issueDescription += `Case Details: ${caseData.casedetails}` + "\n";
    issueDescription += `Special Request: ${caseData.specialrequest}` + "\n";
    issueDescription += `Group Session: ${caseData.groupsessionbool}`;

    const data = {
        "fields": {
          "project": {
              "key": "TY"
          },
          "summary": `${caseData.name.first} ${caseData.name.last}, ${findAgeFromBirthday(caseData.dateofbirth)}y (${arrayToString(caseData.pronouns, ", ")})`,
          "description": {
              "type": "doc",
              "version": 1,
              "content": [{
                  "type": "paragraph",
                  "content": [{
                      "text": issueDescription,
                      "type": "text"
                  }]
              }]},
          "issuetype": {"name": "Task"}
        }
      };
    return data;
}

function arrayToString(arr: Array<string>, seperator: string): string {
    var res = "";
    for(const item of arr) {
        res += item;
        res += seperator;
    }
    return res;
}

function findAgeFromBirthday(dateOfBirth): number {
    const datenow: number = Date.now();
    const dob: number = new Date(`${dateOfBirth.month}/${dateOfBirth.day}/${dateOfBirth.year}`).getTime();
    return Math.floor((datenow - dob)/31556952000);
}

function sendToJira(issue: Object){
    const header = {
        'Authorization': "Basic " + jiraCredentials,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    axios({
        method: 'post',
        url: jiraURL,
        headers: header,
        data: JSON.stringify(issue)
    })
    .then(function (response) {
        console.log("Successfully submitted to Jira.");
        console.log(response);
    })
    .catch(function (error) {
        console.log("Something went wrong");
    })
}