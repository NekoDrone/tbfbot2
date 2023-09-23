import { AuthUser } from "../exports/types";
import editMessageWithInlineButtons from "../telegram/editMessageWithInlineButtons";
import * as type from "../exports/types";

export default function startCaseMenu(userDoc: AuthUser) {
    const messageText = `Case: ${userDoc.selectedCase}\n\nWhat would you like to do?`;
    const buttons: string[] = [
        type.Query.PrintComments,
        type.Query.PrintDetails,
        type.Query.AddComment,
        type.Query.ChangeCaseStatus,
        type.Query.LogOut,
        type.Query.Info,
    ];
    editMessageWithInlineButtons(userDoc, buttons, messageText);
}
