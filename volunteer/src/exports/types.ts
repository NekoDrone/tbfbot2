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
    key: string,
    fields: JiraIssueFields
}

export type JiraIssueFields = {
    labels: string[],
    status: JiraFieldsStatus,
    description: JiraFieldsDesc,
    comment: JiraFieldsComment,

}

export type JiraFieldsStatus = {
    name: string
}

export type JiraFieldsDesc = {
    content: JiraDescContent[],
}

export type JiraDescContent = {
    content: JiraContentInner[] //what the fuck jira. (to access this, you need to do issue.fields.description.content[0].content[0])
}

export type JiraContentInner = {
    text: string
}

export type JiraFieldsComment = {
    total: number,
    comments: JiraCommentInner[]
}

export type JiraCommentInner = {
    body: JiraFieldsDesc //why do you KEEP DOING THIS
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