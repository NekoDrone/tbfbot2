import { firestoreCollection } from "..";

export default async function authUserExistsInFirestore(userId: number): Promise<boolean> {
    const userDoc = await firestoreCollection.where('telegramid', '==', userId).get();
    return !userDoc.empty;
}