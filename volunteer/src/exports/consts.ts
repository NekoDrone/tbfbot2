import * as firestore from "@google-cloud/firestore";

const PROJ_ID = process.env.PROJ_ID;
const AUTH_USERS_COLLECTION: string = process.env.AUTH_USERS_COLLECTION ?? "undefined";
export const TELEGRAM_URL = process.env.TELEGRAM_URL ?? "";
export const TELEGRAM_BOT_KEY = process.env.TELEGRAM_BOT_KEY ?? "";
export const firestoreObject = new firestore.Firestore({
    projectId: PROJ_ID
  })
export const firestoreCollection = firestoreObject.collection(AUTH_USERS_COLLECTION);