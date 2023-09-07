import { firestoreCollection } from "../../exports/consts";

export default async function updateSessionMessageId(userId: number, caseId: number): Promise<void> {
    const doc = (await firestoreCollection.where('telegramid', '==', userId).get()).docs[0].ref;
    const data = {
        selectedCase: caseId
    }
    doc.update(data);
}