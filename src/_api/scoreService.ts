import axios from "./gamestudio";
import {GAME_ID, SCORE_URL} from "./constants";
import {ScoreType} from "../components/mines/services/Score";

const fetchScore = () => axios.get(`${SCORE_URL}/${GAME_ID}`);
const addScore = (points: number) => {
  const score: ScoreType = {
    points,
    game: "mines",
    playedAt: new Date().toISOString(),
    player: "anonymous",
  };
  axios.post(`${SCORE_URL}/${GAME_ID}`, score);
};

const scoreService = { fetchScores: fetchScore, addScore };
export default scoreService;
