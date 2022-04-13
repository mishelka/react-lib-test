import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {minesService, scoreService} from "../../_api";
import Field, {fieldInitial, FieldType} from "./Field";
import GameStateAlert from "./GameStateAlert";
import Services from "./services/Services";

const Mines = () => {
  const [field, setField] = useState<FieldType>(fieldInitial);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetchBoard();
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

  const handleNewGame = () => {
    minesService
      .newGame(10, 10, 3)
      .then(data => {
        setField(data.data);
      }, error => {
        setError(error);
      });
  };

  const actualizeStates = (fieldData: FieldType) => {
    setField(fieldData);
    if(field?.gameState && ('PLAYING'.localeCompare(field.gameState) === 0)) {
      setShowAlert(true);
      scoreService.addScore(field.score);
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

        <Services/>

        { showAlert &&
        <div className="game-state-alert">
          <GameStateAlert show={showAlert}
                          gameState={field?.gameState}
                          onClose={() => setShowAlert(false)}/>
        </div>
        }
      </div>
    </div>
  );
}

export default Mines;
