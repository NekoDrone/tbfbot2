import { firestoreCollection } from "./exports/consts";
import { AuthUser, TeleUpdate } from "./exports/types";

export default function registerNewUser(newUser: TeleUpdate) {
    const newUserDoc: AuthUser = {
        name: newUser.message.from.first_name,
        telegramId: newUser.message.from.id,
        jiraLabel: newUser.message.from.first_name,
        active: true,
        sessionMessageId: 0,
        selectedCase: "",
        expectingStringInput: false,
        inputString: "",
    };
    return firestoreCollection.add(newUserDoc);
}
