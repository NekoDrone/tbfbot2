import { type AuthUser } from "../exports/types";
import editMessageWithInlineButtons from "../telegram/editMessageWithInlineButtons";
import * as type from "../exports/types";

export default function botInfo(userDoc: AuthUser) {
    const buttons: string[] = [type.Query.Cancel];
    const infoText =
        "Version: 1.0.0\nUpdated: 22nd Sept 2023\nMade with love by Sylfr Serenity Tan, for Transbefrienders.";
    editMessageWithInlineButtons(userDoc, buttons, infoText);
}
