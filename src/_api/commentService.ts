import axios from "./gamestudio";
import {COMMENTS_URL, GAME_ID} from "./constants";

const fetchComments = () => axios.get(`${COMMENTS_URL}/${GAME_ID}`);
const addComment = (comment: string) => axios.post(`${COMMENTS_URL}/${GAME_ID}`, comment);

const commentService = { fetchComments, addComment };
export default commentService;
