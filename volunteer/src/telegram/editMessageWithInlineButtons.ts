import axios from "axios";
import { TELEGRAM_BOT_KEY, TELEGRAM_URL } from "../exports/consts";
import { AuthUser, InlineButton, InlineMarkup } from "../exports/types";

const telegramMethodUrl = TELEGRAM_URL + TELEGRAM_BOT_KEY + "/editMessageText";

/**
 * Edits the current conversation message with the provided new message and buttons.
 * @param {AuthUser} userDoc - An object of type AuthUser that contains both the chat ID and the messsage ID to be edited.
 * @param {string[]} buttonLabels - The new message's buttons as a string array. The callback query data for the button will be the same as the text. Both of which are elements of the provided string array.
 * @param {string} newMessage - The new message as a string
 *
 */
export default function editMessageWithInlineButtons(
    userDoc: AuthUser,
    buttonLabels: string[],
    newMessage: string,
): void {
    const buttons = buildKeyboardButtons(buttonLabels);
    const options = {
        chat_id: userDoc.telegramId,
        message_id: userDoc.sessionMessageId,
        text: newMessage,
        reply_markup: buttons,
    };
    axios.post(telegramMethodUrl, options).catch(function (error) {
        console.error(error);
    });
}

function buildKeyboardButtons(buttonLabels: string[]): InlineMarkup {
    const keyboardButtons = new Array<InlineButton[]>();
    for (let i = 0; i < buttonLabels.length; i++) {
        for (let j = 0; j < 1; j++) {
            const button: InlineButton = { text: buttonLabels[i], callback_data: buttonLabels[i] };
            keyboardButtons[i][j] = button;
            i++;
        }
    }
    const markup: InlineMarkup = {
        inline_keyboard: keyboardButtons,
    };
    return markup;
}
