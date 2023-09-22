import { AuthUser } from "../../exports/types";
import { addCommentToCase } from "../../jira/addCommentToCase";
import clearUserInput from "./clearUserInput";

export default function finishAddingComment(userDoc: AuthUser) {
  addCommentToCase(userDoc);
  clearUserInput(userDoc);
}
