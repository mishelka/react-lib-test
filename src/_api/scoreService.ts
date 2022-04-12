import axios from "./gamestudio";
import {GAME_ID, SCORE_URL} from "./constants";

const fetchScore = () => axios.get(`${SCORE_URL}/${GAME_ID}`);
const addScore = (score: number) => axios.post(`${SCORE_URL}/${GAME_ID}`, score);

const scoreService = { fetchScores: fetchScore, addScore };
export default scoreService;
