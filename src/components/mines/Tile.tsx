import React from 'react';

export interface TileType {
  state: string,
  value?: number,
}

export interface TilePropTypes {
  tile: TileType,
}

const Tile = ({tile: {state, value}} : TilePropTypes) => {
  if (state === 'CLOSED' || state === 'MARKED') {
    return <img alt={`${state} tile`}
                src={`http://localhost:8080/images/mines/${state}.png`}/>;
  }
  if(value != undefined && value >= 0) {
    return <img alt={`open tile`} src={`http://localhost:8080/images/mines/open${value}.png`}/>
  }
  return <img alt={`mine`} src={`http://localhost:8080/images/mines/mine.png`}/>;
}

export default Tile;
