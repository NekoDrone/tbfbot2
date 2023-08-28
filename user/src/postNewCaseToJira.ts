import axios from 'axios';
import * as firestore from '@google-cloud/firestore';
import * as firestoreParser from 'firestore-parser';
import * as functions from '@google-cloud/functions-framework';
import protobuf from 'protobufjs';
import { AnyARecord } from 'dns';

const protobufRoot = protobuf.loadSync('data.proto');
const protobufEventType = protobufRoot.lookupType(
    'google.events.cloud.firestore.v1.DocumentEventData'
);

functions.cloudEvent('postNewCaseToJira', async (cloudEvent: any) => {
    const eventData: any = decodeEventDataToJson(cloudEvent.data);
    const firestoreNewDocument = firestoreParser(eventData.value.fields);
    console.log("New Case Created. Sending update to jira.");
    console.log(JSON.stringify(firestoreNewDocument, null, 2));
});

function decodeEventDataToJson(eventData: any): JSON {
    const data = protobufEventType.decode(eventData);
    const decodedData = protobuf.Message.toObject(data);
    console.log('Decoding data finished.');
    return firestoreParser(decodedData.value.fields);
}

function constructJiraIssue(caseData: JSON) {
    
}

function sendToJira(){

}