import { firestoreCollection } from "../..";

export default async function updateSessionMessageId(userId: number, messageId: number): Promise<void> {
    const doc = (await firestoreCollection.where('telegramid', '==', userId).get()).docs[0].ref;
    const data = {
        sessionMessageId: messageId
    }
    doc.update(data);
}