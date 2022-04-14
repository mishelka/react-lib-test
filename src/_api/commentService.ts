import axios from "./gamestudio";
import {COMMENTS_URL, GAME_ID} from "./constants";
import {CommentType} from "../components/mines/services/Comments";
import {formatDate} from "../components/mines/utils";

const fetchComments = () => axios.get(`${COMMENTS_URL}/${GAME_ID}`);
const addComment = (comment: string) => {
  const commentData: CommentType = {
    comment,
    game: "mines",
    commentedAt: formatDate(new Date()),
    player: "anonymous",
  }
  return axios.post(`${COMMENTS_URL}`, {comment: commentData});
}

const commentService = { fetchComments, addComment };
export default commentService;
