
import { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"

class User {
  name = "";
  age = null;
}

function App() {
  const userCollectionRef = collection(db, "users");

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState(new User());
  
  const changeData = (e) => {
    setNewUser({...newUser, [e.target.name]:e.target.value})
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef)
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    getUsers()
  }, []);

  const createNewUser = async () => {
    console.log(newUser.name, newUser.age)
    if (newUser.name && newUser.age){
      await addDoc(userCollectionRef, Number(newUser));
    }
  }

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields ={age: age +1};
    await updateDoc(userDoc, newFields);
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc)
  }

  return (
    <div className="App">
      <div> <p>{newUser.name} {newUser.age}</p> 
        <input type="text" name="name" placeholder='name' onChange={changeData}/>
        <input type="number" name="age" placeholder='age' onChange={changeData}/>
        <button onClick={createNewUser}> create user </button>
      </div>
      {users.map((user, i) => (
          <div key={i}>
            <p>Name: {user.name} Age: {user.age} <button onClick={(e)=> {updateUser(user.id, user.age)}}> age +1</button> <button onClick={(e)=> {deleteUser(user.id)}} >delete</button></p> 
          </div>
      ))}
    </div>
  );
}

export default App;
