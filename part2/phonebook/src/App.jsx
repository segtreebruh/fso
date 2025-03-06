import { useState, useEffect } from 'react';
import phonebook from './services/phonebook';
import { Filter, PersonForm, Persons } from './components/display'

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log('effect');

    phonebook.getAll()
      .then(response => setPersons(response));
  }, [])

  const addName = (event) => {
    event.preventDefault();
    if (newName.length === 0 || newNumber.length === 0) {
      alert('Invalid name/number');
      return;
    }

    const nameObject = {
      name: newName,
      number: newNumber
    };

    const duplicate = persons.find(person => person.name === newName);
    if (duplicate !== undefined) {
      if (window.confirm(`The name "${newName}" already existed. Do you want to update the number?`)) {
        phonebook.updateEntry(duplicate.id, nameObject)
        .then(response => {
          setPersons(persons.map(person => person.name === newName ? response : person))
        })
        .catch(() => {
          alert(`Unable to update entry "${duplicate.name}`);
        });
      }
      setNewName('');
      setNewNumber('');
      return;
    }

    console.log(nameObject);
    phonebook.createEntry(nameObject)
      .then(response => {
        setPersons(persons.concat(response));
        setNewName('');
        setNewNumber('');
      });
  }

  const fields = [
    { id: 1, label: 'name', value: newName, setValue: setNewName },
    { id: 2, label: 'number', value: newNumber, setValue: setNewNumber }
  ];

  const searchFilter = () => {
    if (search.length === 0) return persons;
    return persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()));
  };

  const handleDelete = personToDelete => {
    phonebook.deleteEntry(personToDelete.id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== personToDelete.id));
    })
    .catch(() => {
      alert(`Could not delete ${personToDelete.name} from the database`);
    });
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} setValue={setSearch} />
      <h3>Add new entries</h3>
      <PersonForm fields={fields} onSubmit={addName} />
      <h3>Numbers</h3>
      <Persons persons={searchFilter()} handleDelete={handleDelete}/>
    </div>
  );
}

export default App;