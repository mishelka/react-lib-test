import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Minesweeper } from '../.';

const App = () => {
  return (
    <div>
      <Minesweeper />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
