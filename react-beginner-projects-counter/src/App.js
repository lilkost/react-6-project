import './index.scss';
import { useState } from 'react';

function App() {

  const [counter, setCounter] = useState(0);
  const onCLickPlus = () => {
    setCounter(counter + 1)
  }
  const onCLickMinus = () => {
    if(counter > 0) setCounter(counter - 1)
  }
  return (
    <div className="App">
      <div>
        <h2>Счетчик:</h2>
        <h1>{counter}</h1>
        <button onClick={onCLickMinus} className="minus">- Минус</button>
        <button onClick={onCLickPlus} className="plus">Плюс +</button>
      </div>
    </div>
  );
}

export default App;
