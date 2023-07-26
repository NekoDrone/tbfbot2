import * as functions from '@google-cloud/functions-framework';
import * as firestore from '@google-cloud/firestore';
import axios from 'axios';

const PROJ_ID = process.env.PROJ_ID;
const COLLECTION_NAME: string = process.env.COLLECTION_NAME ?? 'undefined';
const firestoreCollection = new firestore.Firestore({
    projectId: PROJ_ID
}).collection(COLLECTION_NAME);

functions.http('newCaseHello', (req: functions.Request, res: functions.Response) => {

    
    if(true){//telegram user id exists in newcasedata store

    }
})

async function doesUserExistinFirestore(userID) {

    const caseData = await firestoreCollection.where(COLLECTION_NAME, '==', userID).get();

}