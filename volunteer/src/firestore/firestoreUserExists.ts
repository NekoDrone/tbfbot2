import { firestoreCollection } from "../exports/consts";

export default async function authUserExistsInFirestore(userId: number): Promise<boolean> {
    const userDoc = await firestoreCollection.where('telegramid', '==', userId).get();
    return !userDoc.empty;
}