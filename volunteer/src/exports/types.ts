//telegram
export type TeleUpdate = {
    update_id: string;
    message: Message;
    callback_query: CallbackQuery;
};

export type Message = {
    from: User;
    text: string;
};

export type User = {
    id: number;
    username: string;
};

export type CallbackQuery = {
    id: string;
    from: User;
    data: string;
    message: Message;
};

//jira
export type JiraIssue = {
    key: string;
    fields: JiraIssueFields;
};

export type JiraIssueFields = {
    labels: string[];
    status: JiraFieldsStatus;
    description: JiraFieldsDesc;
    comment: JiraFieldsComment;
};

export type JiraFieldsStatus = {
    name: string;
};

export type JiraFieldsDesc = {
    content: JiraDescContent[];
};

export type JiraDescContent = {
    content: JiraContentInner[]; //what the fuck jira. (to access this, you need to do issue.fields.description.content[0].content[0])
};

export type JiraContentInner = {
    text: string;
    type: string;
};

export type JiraFieldsComment = {
    total: number;
    comments: JiraCommentInner[];
};

export type JiraCommentInner = {
    body: JiraFieldsDesc; //why do you KEEP DOING THIS
    created: string;
};

export enum JiraStatusId {
    EscalateCase = 51,
    CloseCase = 61,
}

export type JiraIssueTransition = {
    id: number;
};

//local
export type AuthUser = {
    name: string;
    telegramId: number;
    jiraLabel: string;
    active: boolean;
    sessionMessageId: number;
    selectedCase: string;
    expectingStringInput: boolean;
    inputString: string;
};

export enum Query {
    PrintDetails = "Print Details",
    PrintComments = "Print Comments",
    AddComment = "Add Comment",
    ChangeCaseStatus = "Change Case Status",
    LogOut = "Log Out",
    Back = "Back",
    Cancel = "Cancel",
    Edit = "Edit",
    Confirm = "Confirm",
    Info = "Info",
    EscalateCase = "Escalate Case",
    CloseCase = "Close Case",
}
