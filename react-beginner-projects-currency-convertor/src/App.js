import {useState, useEffect, useRef, React} from 'react';
import { Block } from './Block';
import './index.scss';

function App() {

  // const [rates, setRates] = useState([]);

  const ratesRef = useRef({})

  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setfromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price *  ratesRef.current[toCurrency]
    setfromPrice(value);
    setToPrice(result.toFixed(2));
  }
  const onChangeToPrice = (value) => {
    const result = ( ratesRef.current[fromCurrency] /  ratesRef.current[toCurrency] ) * value;
    setfromPrice(result);
    setToPrice(value.toFixed(2));
  }
  
  useEffect(() => {
    // 1d47a2a8ede627917dc365bb7f110226
    fetch('http://data.fixer.io/api/latest?access_key=1d47a2a8ede627917dc365bb7f110226')
    .then(res=> res.json())
    .then(json=> {
      // setRates(json.rates);
      ratesRef.current = json.rates;
      onChangeToPrice(1)
    })
    .catch(error => {
      console.warn(error);
      alert(error);
    })
  }, [])
  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency])
  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency])
  
  return (
    <div className="App">
      <Block 
        value={fromPrice} 
        currency={fromCurrency} 
        onChangeCurrency={setFromCurrency} 
        onChangeValue={onChangeFromPrice} />
      <Block 
        value={toPrice} 
        currency={toCurrency}  
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />  
    </div>
  );
}

export default App;
