import React, { useState, useEffect } from "react";
import axios from "axios";

const PeopleForm = ({
  newName,
  newNumber,
  addContact,
  setNewName,
  setNewNumber,
}) => (
  <form onSubmit={addContact}>
    <fieldset>
      <legend>Add Contact</legend>
      <div>
        Name{" "}
        <input
          value={newName}
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
      </div>
      <div>
        Number{" "}
        <input
          value={newNumber}
          onChange={(event) => {
            setNewNumber(event.target.value);
          }}
        />
      </div>

      <div>
        <button type="submit"> Add </button>
      </div>
    </fieldset>
  </form>
);

const Person = ({ name, number, id, removeContact }) => (
  <li>
    {name} {number}{" "}
    <button
      onClick={() => {
        removeContact(id, name);
      }}
    >
      {" "}
      Delete{" "}
    </button>
  </li>
);

const People = ({ people, removeContact }) => (
  <ul>
    {people.map((person) => (
      <Person
        key={person.id}
        name={person.name}
        number={person.number}
        id={person.id}
        removeContact={removeContact}
      />
    ))}
  </ul>
);

const FilterContacts = ({ setFilterBy }) => (
  <div>
    Filter{" "}
    <input
      onChange={(event) => {
        setFilterBy(event.target.value);
      }}
    />
  </div>
);

const Message = (props) => {
  const { shouldShow, message } = props;
  const styles = {
    color: "green",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (shouldShow && true) {
    return <div style={styles}> {message} </div>;
  } else {
    return null;
  }
};

const PhoneBook = (props) => {
  const [contacts, setContacts] = useState([]);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const filteredContacts = contacts.filter(
    (contact) => !!contact.name && contact.name.includes(filterBy)
  );
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setContacts(response.data);
    });
  }, []);

  const [message, setMessage] = useState("");
  const [shouldMessage, setShouldMessage] = useState(false);
  const showMessage = (message) => {
    setMessage(message);
    setShouldMessage(true);
    setTimeout(() => {
      setShouldMessage(false);
      setMessage("");
    }, 3000);
  };

  const addContact = (event) => {
    event.preventDefault();

    if (newNumber === "" || newName === "") {
      alert("something is missing");
    } else if (contacts.map((contact) => contact.name).includes(newName)) {
      /*
      alert(`${newName} already added to phonebook`);
      setContacts(contacts);
      */
      if (
        window.confirm(
          `${newName} already added, want to change the number?`
        ) === true
      ) {
        const contact = contacts.find((contact) => contact.name === newName);
        const updatedContact = {
          name: contact.name,
          number: newNumber,
        };
        axios
          .put(`http://localhost:3001/persons/${contact.id}`, updatedContact)
          .then((response) => {
            setContacts(
              contacts.map((i) =>
                contact === i ? { ...updatedContact, id: contact.id } : i
              )
            );
            showMessage(`${newName} phone number updated to ${newNumber}`);
            setNewName("");
            setNewNumber("");
          });
      } else {
        setNewName("");
        setNewNumber("");
      }
    } else {
      const noteObject = {
        number: newNumber,
        name: newName,
      };
      axios
        .post("http://localhost:3001/persons", noteObject)
        .then((response) => {
          setContacts(contacts.concat(response.data));
          showMessage(`${newName} added to contacts list`);
          setNewNumber("");
          setNewName("");
        })
        .catch((error) => {
          showMessage(error);
        });
    }
  };
  const removeContact = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      axios.delete(`http://localhost:3001/persons/${id}`).then((response) => {
        setContacts(contacts.filter((contact) => contact.id !== id));
      });
    }
  };

  return (
    <div>
      <h2> Phonebook </h2>
      <Message shouldShow={shouldMessage} message={message} />
      <FilterContacts setFilterBy={setFilterBy} />
      <People people={filteredContacts} removeContact={removeContact} />
      <PeopleForm
        newName={newName}
        newNumber={newNumber}
        addContact={addContact}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <PhoneBook></PhoneBook>
    </div>
  );
}

export default App;
