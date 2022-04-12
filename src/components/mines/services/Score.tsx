import React from 'react';
import Table from 'react-bootstrap/Table';

export interface ScoreType {
  ident: number,
  points: number,
  playedAt: number,
  player: string,
}

export interface ScorePropTypes {
  scores: ScoreType[],
}

const Score = ({scores} : ScorePropTypes) => {
  return (
    <div className="container">
      <h1>Scores</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Player</th>
            <th>Points</th>
            <th>Played At</th>
          </tr>
        </thead>
        <tbody>
          { scores.map((score) => (
            <tr key={score.ident}>
              <td>{score.player}</td>
              <td>{score.points}</td>
              <td>{new Date(score.playedAt).toLocaleString()}</td>
            </tr>
          )) }
        </tbody>
      </Table>
    </div>
  );
}

export default Score;
