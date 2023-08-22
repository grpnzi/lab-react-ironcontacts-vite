import "./App.css";
import { useState } from 'react';
import contactsDB from "./contacts.json";


function App() {
  const [contacts, setContacts] = useState(contactsDB.slice(0, 5));

  function handleClick(contactId) {
    console.log(contactId);
    const filteredContacts = contacts.filter((contact) => {
      return contact.id !== contactId
    })

    setContacts(filteredContacts);
  }

  function sortNameClick() {
    const filteredContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));

    setContacts(filteredContacts);
  }

  function sortPopularityClick() {

    const filteredContacts = [...contacts].sort((a,b) => b.popularity - a.popularity)

    setContacts(filteredContacts);
  }

  function addRandomContactClick() {

    const filteredContacts = contactsDB.filter((contact) =>{
      return !contacts.some(existingContact => existingContact.id === contact.id);

    })

    if (filteredContacts.length > 0) {
      let randomItem = filteredContacts[Math.floor(Math.random() * filteredContacts.length)];

      setContacts(prevContacts => [...contacts, randomItem]);
    } else {
      console.log("No more unique contacts to add.");
    }

  }


  return (
    <div className="App">
      <>
        <h1>LAB | React IronContacts</h1>
        <button onClick={() => addRandomContactClick()}>Add Random Contact</button>
        <button onClick={() => sortPopularityClick()}>Sort by Popularity</button>
        <button onClick={() => sortNameClick()}>Sort by Name</button>
        <table>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
          {contacts.map((contact, index) => (
            <tr key={contact.id}>
              <td><img src={contact.pictureUrl} alt="Picture" width="50px" /></td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              {contact.wonOscar ? <td>🏆</td> : <td></td>}
              {contact.wonEmmy ? <td>🏆</td> : <td></td>}
              <td><button onClick={() => handleClick(contact.id)}>Delete</button></td>
            </tr>
          ))}
        </table>
      </>
    </div>
  );
}

export default App;
