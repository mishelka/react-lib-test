import axios from "./gamestudio";
import {COMMENTS_URL, GAME_ID} from "./constants";
import {CommentType} from "../components/mines/services/Comments";

const fetchComments = () => axios.get(`${COMMENTS_URL}/${GAME_ID}`);
const addComment = (comment: string) => {
  const commentData: CommentType = {
    comment,
    game: "mines",
    commentedAt: new Date().toISOString(),
    player: "anonymous",
  }
  return axios.post(`${COMMENTS_URL}`, {comment: commentData});
}

const commentService = { fetchComments, addComment };
export default commentService;
