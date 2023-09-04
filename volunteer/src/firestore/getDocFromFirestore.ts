import { firestoreCollection } from "..";


export default async function getDocFromFirestore(userId: number): Promise<AuthUser> {
    const userDoc = (await firestoreCollection.where('telegramid', '==', userId).get()).docs[0].data();
    return userDoc as AuthUser;
}

export type AuthUser = {
  name: string,
  telegramId: number,
  jiraLabel: string,
  active: boolean,
  sessionMessageId: number,
  expectingStringInput: boolean,
  selectedCase: string,
}