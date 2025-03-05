import { useState } from 'react';

const Filter = ({ value, setValue }) => {
  return (
    <div>
      search: <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};

const PersonForm = ({ fields, onSubmit }) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        {fields.map(({ id, label, value, setValue }) => (
          <div key={id}>
            {label}: <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
          </div>
        ))}
        <button type="submit">add</button>
      </form>
    </>
  );
};

const Persons = ({ persons }) => {
  if (persons.length === 0) {
    return (
      <div>No entries found</div>
    )
  }
  return (
    <ul>
      {persons.map(person => (
        <li key={person.id}>{person.name} {person.number}</li>
      ))}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  const addName = (event) => {
    event.preventDefault();
    if (newName.length === 0 || newNumber.length === 0) {
      alert('Invalid name/number');
      return;
    }
    if (persons.some(person => (person.name === newName || person.number === newNumber))) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewNumber('');
      return;
    }

    const nameObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    };

    setPersons(persons.concat(nameObject));
    setNewName('');
    setNewNumber('');
  }

  const fields = [
    { id: 1, label: 'name', value: newName, setValue: setNewName },
    { id: 2, label: 'number', value: newNumber, setValue: setNewNumber }
  ];

  const searchFilter = () => {
    if (search.length === 0) return persons;
    return persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} setValue={setSearch} />
      <h3>Add new entries</h3>
      <PersonForm fields={fields} onSubmit={addName} />
      <h3>Numbers</h3>
      <Persons persons={searchFilter()} />
    </div>
  );
}

export default App;