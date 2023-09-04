import axios from "axios";
import { TELEGRAM_URL } from "..";
import { TELEGRAM_BOT_KEY } from "..";

const telegramEditUrl = TELEGRAM_URL + TELEGRAM_BOT_KEY + "/editMessageText";

export default function editMessageWithInlineButtons(userId: number, messageId: number, buttonLabels: string[]): void{
    const buttons = buildKeyboardButtons(buttonLabels);
    const messageText = "Hello! Please choose a case from the list below:"
    const options = {
        chat_id: userId,
        message_id: messageId,
        text: messageText,
        reply_markup: buttons,
    }
    axios.post(telegramEditUrl, options)
    .then(function (response: any) {
      console.log(response);
    })
    .catch(function (error: any) {
      console.error(error);
    });
}

function buildKeyboardButtons(buttonLabels: string[]): InlineKeyboardbutton[] {
    var keyboardButtons = new Array<InlineKeyboardbutton>();
    for(const label of buttonLabels){
        const button: InlineKeyboardbutton = {text: label, callback_data: label}
        keyboardButtons.push(button);
    }
    return keyboardButtons;
}

type InlineKeyboardbutton = {
    text: string,
    callback_data: string
}