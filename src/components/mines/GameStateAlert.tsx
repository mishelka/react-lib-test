import React from "react";
import {Alert, Button} from "react-bootstrap";

export interface GameStateAlertPropTypes {
  show: boolean,
  gameState: string | null | undefined,
  onClose: () => void,
}

const GameStateAlert = ({show, gameState, onClose} : GameStateAlertPropTypes) => {
  if(!show || gameState && gameState === 'PLAYING') return null;
  return (
    <Alert show={show} variant="success" className="alert">
      <Alert.Heading>You {gameState === 'FAILED' ? 'lost' : 'won'}!</Alert.Heading>
      {gameState === 'FAILED' ? 'Pity :(' : 'Congratulations :)'}
      <hr/>
      <div className="d-flex justify-content-center">
        <Button onClick={() => onClose()} variant="outline-success">
          Close
        </Button>
      </div>
    </Alert>
  );
}

export default GameStateAlert;
