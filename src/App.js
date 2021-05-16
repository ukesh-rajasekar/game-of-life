import './App.css';
import { useState, useRef, useCallback } from 'react';
import produce from 'immer';

const numRows = 50;
const numCols = 50;

const createEmptyGrid = () => {
   let rows = [];
   for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
   }
   return rows;
};
function App() {
   const [grid, setGrid] = useState(createEmptyGrid());
   const [running, setRunning] = useState(false);
   const [speed, setSpeed] = useState(250);

   const runningRef = useRef();
   runningRef.current = running;

   const simulate = useCallback(() => {
      if (!runningRef.current) {
         return;
      }
      setGrid((grid) => {
         return produce(grid, (gridCopy) => {
            for (var i = 0; i < numRows; i++) {
               for (var j = 0; j < numCols; j++) {
                  let neighbors = 0;
                  //left cell
                  if (j) {
                     neighbors = neighbors + grid[i][j - 1];
                  }
                  //right cell
                  if (j < numCols - 1) {
                     neighbors = neighbors + grid[i][j + 1];
                  }
                  //top cell
                  if (i) {
                     neighbors = neighbors + grid[i - 1][j];
                  }
                  //bottom cell
                  if (i < numRows - 1) {
                     neighbors = neighbors + grid[i + 1][j];
                  }
                  //top right cell
                  if (j < numCols - 1 && i) {
                     neighbors = neighbors + grid[i - 1][j + 1];
                  }
                  //top left cell
                  if (j && i) {
                     neighbors = neighbors + grid[i - 1][j - 1];
                  }
                  //bottom right cell
                  if (i < numRows - 1 && j < numCols - 1) {
                     neighbors = neighbors + grid[i + 1][j + 1];
                  }
                  //bottom left cell
                  if (i < numRows - 1 && j) {
                     neighbors = neighbors + grid[i + 1][j - 1];
                  }
                  if (neighbors < 2 || neighbors > 3) {
                     gridCopy[i][j] = 0;
                  } else if (grid[i][j] === 0 && neighbors === 3) {
                     gridCopy[i][j] = 1;
                  }
               }
            }
         });
      });

      setTimeout(simulate, 250);
   }, []);

   return (
      <>
         <button
            onClick={() => {
               setRunning(!running);
               if (!running) {
                  runningRef.current = true;
                  simulate();
               }
            }}
         >
            {running ? 'stop' : 'start'}
         </button>
         <button onClick={() => setGrid(createEmptyGrid())}>clear</button>
         <button
            onClick={() => {
               let rows = [];
               for (let i = 0; i < numRows; i++) {
                  rows.push(
                     Array.from(Array(numCols), () =>
                        Math.random() > 0.9 ? 1 : 0
                     )
                  );
               }
               setGrid(rows);
            }}
         >
            random
         </button>

         <div
            className='App'
            style={{
               display: 'grid',
               gridTemplateColumns: `repeat(${numCols}, 20px)`,
            }}
         >
            {grid.map((rows, i) =>
               rows.map((cols, j) => (
                  <div
                     key={`${i}-${j}`}
                     onClick={() => {
                        const newGrid = produce(grid, (newGrid) => {
                           newGrid[i][j] = grid[i][j] ? 0 : 1;
                        });
                        setGrid(newGrid);
                     }}
                     style={{
                        width: 20,
                        height: 20,
                        background: grid[i][j] ? 'green' : undefined,
                        border: 'solid 1px black',
                     }}
                  />
               ))
            )}
         </div>
      </>
   );
}

export default App;
