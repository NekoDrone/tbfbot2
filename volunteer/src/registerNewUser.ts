import { authUsersCollection } from "./exports/consts";
import { AuthUser, TeleUpdate } from "./exports/types";

export default function registerNewUser(newUser: TeleUpdate) {
    console.log(`Attempting to register new user: @${newUser.message.from.username}`);
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
    return authUsersCollection.add(newUserDoc);
}
