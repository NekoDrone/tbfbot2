import { authUsersCollection } from "../../exports/consts";
import { AuthUser } from "../../exports/types";

export default async function getDocFromFirestore(userId: number): Promise<AuthUser> {
    const userDoc = (
        await authUsersCollection.where("telegramId", "==", userId).get()
    ).docs[0].data();
    return userDoc as AuthUser;
}
