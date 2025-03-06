export const Filter = ({ value, setValue }) => {
  return (
    <div>
      search: <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};

export const PersonForm = ({ fields, onSubmit }) => {
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

export const Persons = ({ persons, handleDelete }) => {
  if (persons.length === 0) {
    return (
      <div>No entries found</div>
    )
  }
  return (
    <ul>
      {persons.map(person => (
        <li key={person.id}>{person.name} {person.number}
          <button onClick={() => {
            if (window.confirm(`Are you sure to delete ${person.name} from the phonebook?`)) {
              handleDelete(person)
            }
          }}> delete </button>
        </li>
      ))}
    </ul>
  )
}