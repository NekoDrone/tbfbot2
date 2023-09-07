export type TeleUpdate = {
    update_id: string,
    message: Message,
    callback_query: CallbackQuery
}

export type Message = {
    from: User,
    text: string
}

export type User = {
    id: number,
    username: string
}

export type CallbackQuery = {
    from: User,
    data: string,
    message: Message
}

export type JiraIssue = {
    someProperty: string
}

export type AuthUser = {
    name: string,
    telegramId: number,
    jiraLabel: string,
    active: boolean,
    sessionMessageId: number,
    expectingStringInput: boolean,
    selectedCase: string,
  }

export enum Query {
    PrintDetails = "PrintDetails",
    PrintComments = "PrintComments",
    AddComment = "AddComment",
    ChangeCaseStatus = "ChangeCaseStatus",
    LogOut = "LogOut"
}