import React, {useState} from 'react'


const PeopleForm = ({newName,newNumber,addContact,setNewName,setNewNumber}) => (
  <form onSubmit={addContact}>
    <fieldset>
      <legend>Add Contact</legend>
      <div>Name <input value={newName} onChange={event => {setNewName(event.target.value)}  }/></div>
      <div>Number <input value={newNumber} onChange={event => {setNewNumber(event.target.value)}}/></div>

      <div><button type="submit"> Add </button></div>
    </fieldset>
  </form>
)

const People = ({people}) => (
  <ul>
    {people.map(person => 
      <li key={person.id}>{person.name} {person.number}</li>
    )}
  </ul>
)

const FilterContacts = ({setFilterBy}) =>  <div>Filter <input onChange={(event) => {setFilterBy(event.target.value)}}/></div>



const PhoneBook = (props) => {
  const [contacts, setContacts] = useState([])
  const [newNumber, setNewNumber] = useState("") 
  const [newName, setNewName] = useState("")
  const [filterBy, setFilterBy] = useState("")
  const filteredContacts = contacts.filter((contact) => contact.name.includes(filterBy))
  const addContact = (event) => {
    event.preventDefault()

    if (newNumber === "" || newName === "") {setContacts(contacts)}
    else if (contacts.map(contact => contact.number).includes(newNumber)) {
      alert(`${newName} already added to phonebook`)
      setContacts(contacts)
      setNewName('')
      setNewNumber('')
    }
    else {
      console.log("added")
      const noteObject = {
        number: newNumber,
        name: newName,
        date: new Date().toISOString(),
        id: contacts.length + 1,
      }
      
      setContacts(contacts.concat(noteObject))
      setNewNumber('') 
      setNewName('')
      console.log("reset")
    }
  }

  return (
    <div>
      <h2> Phonebook </h2>
      <FilterContacts setFilterBy={setFilterBy}/>
      <People people={filteredContacts}/>
      <PeopleForm newName={newName} newNumber={newNumber} addContact={addContact} setNewName={setNewName} setNewNumber={setNewNumber}/>
    </div>
  )
}

export default PhoneBook