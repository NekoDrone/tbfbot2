import * as firestore from "@google-cloud/firestore";

//firestore
const PROJ_ID = process.env.PROJ_ID;
const AUTH_USERS_COLLECTION: string = process.env.AUTH_USERS_COLLECTION ?? "undefined";
const CASE_STATUS_COLLECTION: string = process.env.CASE_STATUS_COLLECTION ?? "undefined";
export const firestoreObject = new firestore.Firestore({
    projectId: PROJ_ID,
});
export const authUsersCollection = firestoreObject.collection(AUTH_USERS_COLLECTION);
export const caseStatusCollection = firestoreObject.collection(CASE_STATUS_COLLECTION);

//telegram
export const TELEGRAM_URL = process.env.TELEGRAM_URL ?? "";
export const TELEGRAM_BOT_KEY = process.env.TELEGRAM_BOT_KEY ?? "";

//jira
export const JIRA_URL = process.env.JIRA_URL ?? "undefined";
const JIRA_KEY = process.env.JIRA_KEY ?? "undefined";
const JIRA_EMAIL = process.env.JIRA_EMAIL ?? "undefined";
export const jiraCredentials = Buffer.from(JIRA_EMAIL + ":" + JIRA_KEY, "base64").toString(
    "base64",
);
