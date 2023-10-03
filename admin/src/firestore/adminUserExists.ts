import { adminUsersCollection } from "../exports/consts";

export default async function adminUserExists(userId: number) {
    const userDoc = await adminUsersCollection.where("telegramid", "==", userId).get();
    return !userDoc.empty;
}
