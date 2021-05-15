import './App.css';
import { useState } from 'react';

const numRows = 50;
const numCols = 50;

function App() {
   let rows = [];
   for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
   }
   const [grid, setGrid] = useState(rows);

   console.log(grid);

   return (
      <div
         className='App'
         style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${numCols}, 20px)`,
         }}
      >
         {grid.map((rows, i) =>
            rows.map((cols, k) => (
               <div
                  key={`${i}-${k}`}
                  style={{
                     width: 20,
                     height: 20,
                     background: grid[i][k] ? 'green' : undefined,
                     border: 'solid 1px black',
                  }}
               />
            ))
         )}
      </div>
   );
}

export default App;
