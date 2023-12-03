import { useEffect, useState } from 'react';
import Collection from './Collection';
import './index.scss';


function App() {
  const [categoryId, setCategoryId] = useState(0)
  const [page, setPage] = useState(1)
  const [collection, setCollection] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoadaing, setIsLoadaing] = useState(true);
  const cats = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
  ]

  useEffect(() => {
    setIsLoadaing(true)

    const category = categoryId ? `category=${categoryId}` : '';
    fetch(`https://656c512fe1e03bfd572e2fab.mockapi.io/photos?page=${page}&limit=3&${category}`)
    .then((res)=>res.json())
    .then(json=> {
      setCollection(json)
    })
    .catch(error =>{
      console.log(error);
    })
    .finally(()=> setIsLoadaing(false))
  }, [categoryId, page])
  

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, index)=> 
            <li 
              className={categoryId === index ? 'active': ''} 
              key={obj.name}
              onClick={()=> setCategoryId(index)}
              >
                {obj.name}
            </li>
          )}
        </ul>
        <input 
          value={searchValue} 
          onChange={e =>setSearchValue(e.target.value)}
          className="search-input" 
          placeholder="Поиск по названию" 
        />
      </div>
      <div className="content">
        {isLoadaing ? (<h2>Идет загрузка...</h2>) :
          (
            collection.filter(obj=> {
              return obj.name.toLowerCase().includes(searchValue.toLowerCase())
            })
            .map((obj, index)=> 
              <Collection
                key={index}
                name={obj.name}
                images={obj.photos}
              />
            )
          )
      
        }
      </div>
      <ul className="pagination">
        {
          [...Array(5)].map((_, index)=>
            <li 
            className={page === (index + 1) ? 'active' : ''}
            onClick={()=> setPage(index + 1)}
            >
              {index + 1}
            </li>
          )
        }
      </ul>
    </div>
  );
}

export default App;
