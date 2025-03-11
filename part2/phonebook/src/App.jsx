import { useState, useEffect } from 'react';
import phonebook from './services/phonebook';
import Notification from './components/notifications';
import { Filter, PersonForm, Persons } from './components/display'

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    phonebook.getAll()
      .then(response => setPersons(response));
  }, [])

  const addName = (event) => {
    event.preventDefault();

    const nameObject = {
      name: newName,
      number: newNumber
    };

    const duplicate = persons.find(person => person.name === newName);
    if (duplicate !== undefined) {
      if (window.confirm(`The name ${newName} already existed. Do you want to update the number?`)) {
        phonebook.updateEntry(duplicate.id, nameObject)
          .then(response => {
            setPersons(persons.map(person => person.name === newName ? response : person));
            setNotification({
              msg: `Updated ${duplicate.name}`,
              type: 'success'
            });
            console.log(notification);
            setTimeout(() => setNotification(null), 5000);
          })
          .catch(error => {
            // alert(`Unable to update entry "${duplicate.name}`);
            setNotification({
              msg: `Unable to update entry ${duplicate.name}: ${error.error}`,
              type: 'error'
            });
            setTimeout(() => setNotification(null), 5000);
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

        setNotification({
          msg: `Added ${response.name}`,
          type: 'success'
        });
        setTimeout(() => setNotification(null), 5000);
      })
      .catch(error => {
        setNewName('');
        setNewNumber('');
        setNotification({
          msg: error.error,
          type: 'error'
        });
        setTimeout(() => setNotification(null), 5000);
      })
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
        // alert(`Could not delete ${personToDelete.name} from the database`);
        setNotification({
          msg: `Could not delete ${personToDelete.name} from the database`,
          type: 'error'
        });
        setTimeout(() => setNotification(null), 5000);
      });
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} setValue={setSearch} />
      <h3>Add new entries</h3>
      <Notification notification={notification} />
      <PersonForm fields={fields} onSubmit={addName} />
      <h3>Numbers</h3>
      <Persons persons={searchFilter()} handleDelete={handleDelete} />
    </div>
  );
}

export default App;