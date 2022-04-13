import React from 'react';
import Tile, {TileType} from "./Tile";

export interface FieldType {
  rowCount: number,
  columnCount: number,
  mineCount: number,
  gameState: string | null,
  score: number,
  tiles: TileType[][] | null,
}

export const fieldInitial: FieldType = {
  rowCount: 0,
  columnCount: 0,
  mineCount: 0,
  score: -1,
  gameState: null,
  tiles: null,
}

export interface FieldPropTypes {
  tiles: TileType[][],
  handleClick: (rows: number, cols: number, mark: boolean) => void,
}

const Field = ({tiles, handleClick}: FieldPropTypes) => {
  const tileStyle = {margin: 0, padding: 0, height: "17px", maxHeight: "17px", fontSize: 0};
  return (
    <table>
      <tbody>
      {tiles.map((row, r) => (
        <tr key={`r-${r}`}>
          {row.map((tile, c) => (
            <td key={`c-${r}-${c}`}
                style={tileStyle}
                onClick={() => {
                  handleClick(r, c, false);
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleClick(r, c, true);
                }}>
              <Tile tile={tile}/>
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  );
}

export default Field;
