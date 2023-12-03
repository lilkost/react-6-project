import {useState, useEffect} from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(()=> {
    fetch('https://reqres.in/api/users')
    .then(res => res.json()) 
    .then(json=> {
      setUsers(json.data);
    })
    .catch(error => {
      console.warn(error);
      alert(error);
    })
    .finally(()=> setLoading(false));
  }, []);

  const onChangeSerchValue = (event) => {
    setSearchValue(event.target.value);
  } 

  const onCLickInvite = (id) => {
    if(invites.includes(id)) {
      setInvites(prev =>prev.filter(_id=> _id !== id))
    }
    else {
      setInvites(prev => [...prev, id]);
    }
  }

  const onClickSendInvites = () => {
    setSuccess(true);
  }

  return (
    <div className="App">
      {
        success ? (<Success count={invites.length} />) : (
        <Users
          onChangeSerchValue={onChangeSerchValue} 
          searchValue={searchValue} 
          items={users} 
          isLoading={isLoading} 
          invites={invites}
          onCLickInvite={onCLickInvite}
          onClickSendInvites={onClickSendInvites}
        />
        )
      }

    </div>
  );
}

export default App;
