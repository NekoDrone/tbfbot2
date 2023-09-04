import { firestoreCollection } from "../..";

export default async function updateUserMessageId(userId: number, messageId: number) {
    const doc = (await firestoreCollection.where('telegramid', '==', userId).get()).docs[0]
}