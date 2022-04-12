import axios from "./gamestudio";
import {GAME_ID} from "./constants";

const BOARD_URL = `/game/${GAME_ID}/board`;
const NEW_GAME_URL = BOARD_URL + "/newGame";
const OPEN_TILE_URL = BOARD_URL + "/openTile";
const MARK_TILE_URL = BOARD_URL + "/markTile";

export const fetchBoard = () => axios.get(BOARD_URL);
export const newGame = (rows: number, cols: number, mines: number) => axios.get(`${NEW_GAME_URL}?rows=${rows}&cols=${cols}&mines=${mines}`);
export const openTile = (row: number, col: number) => axios.get(`${OPEN_TILE_URL}?row=${row}&col=${col}`);
export const markTile = (row: number, col: number) => axios.get(`${MARK_TILE_URL}?row=${row}&col=${col}`);

const minesService = { fetchBoard, newGame, openTile, markTile };
export default minesService;
