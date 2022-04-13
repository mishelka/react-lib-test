import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {minesService, scoreService, commentService} from "../../_api";
import Field, {fieldInitial, FieldType} from "./Field";
import GameStateAlert from "./GameStateAlert";
import Services from "./services/Services";

const Mines = () => {
  const [field, setField] = useState<FieldType>(fieldInitial);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [scoreSent, setScoreSent] = useState(true);
  const [scores, setScores] = useState([]);
  const [comments, setComments] = useState([]);
  const [scoreError, setScoreError] = useState(null);
  const [commentsError, setCommentsError] = useState(null);

  useEffect(() => {
    fetchBoard();
    fetchServices();
    setShowAlert(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBoard = () => {
    minesService
      .fetchBoard()
      .then(data => {
        setField(data.data);
      })
  };

  const fetchServices = () => {
    scoreService.fetchScores().then(
      response => setScores(response.data),
      error => { setScoreError(error?.message); setScores([]); });
    commentService.fetchComments().then(
      response => setComments(response.data),
      error => { setCommentsError(error?.message); setComments([]); });
  };

  const handleNewGame = () => {
    minesService
      .newGame(10, 10, 3)
      .then(data => {
        setField(data.data);
        setScoreSent(false);
      }, error => {
        setError(error);
      });
  };

  const actualizeStates = (fieldData: FieldType) => {
    setField(fieldData);
    if(!scoreSent && field?.gameState && ('PLAYING'.localeCompare(field.gameState) === 0)) {
      setShowAlert(true);
      scoreService.addScore(field.score).then(() => setScoreSent(true));
    }
  }

  const handleTileClicked = (row: number, col: number, mark: boolean) => {
    if(field.gameState === 'PLAYING') {
      if(mark) {
        minesService
          .markTile(row, col)
          .then(data => {
            actualizeStates(data.data);
          }/*,
          e => {//
            //handle error
          }*/);
      } else {
        minesService
          .openTile(row, col)
          .then(data => {
            actualizeStates(data.data);
          }/*,
          e => {//
            //handle error
          }*/);
      }
    }
  };

  return (
    <div className="mines-container">
      <div className="container">
        <h1>Minesweeper</h1>
        { !error && field?.score >= 0 &&
        <h4>Score: {field.score}</h4>
        }

        <div className="game-container">
          { !error && field?.tiles &&
            <Field tiles={field.tiles}
                   handleClick={handleTileClicked}/>
          }
          {error && <h2>"Sorry, we could not load your game :("</h2>}
        </div>

        <div className="button-container">
          <Button variant="outline-success" onClick={() => handleNewGame()}>New Game</Button>
        </div>

        <Services scores={scores}
                  comments={comments}
                  scoreError={scoreError}
                  commentsError={commentsError}
                  onAddComment={() => fetchServices()}/>

        { showAlert &&
        <div className="game-state-alert">
          <GameStateAlert show={showAlert}
                          gameState={field?.gameState}
                          onClose={() => {
                            setShowAlert(false);
                            fetchServices();
                          }}/>
        </div>
        }
      </div>
    </div>
  );
}

export default Mines;
