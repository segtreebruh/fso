import { useState, useEffect } from 'react';
import { SearchBar, Display } from './components/display';
import backend from './services/backend'

const App = () => {
  const [search, setSearch] = useState('');
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    backend.getAll()
      .then(response => {
        setCountriesData(response);
      })
  }, []);

  const handleSearch = () => {
    //console.log(`HandleSearch: ${search}`);
    if (search.length === 0) return null;
    const result = countriesData.filter(country =>
      country.name.common.toLowerCase().includes(search.toLowerCase()));

    // console.log(`HandleSearch result: ${JSON.stringify(result)}`);
    return result;
  }

  return (
    <div>
      <SearchBar setValue={setSearch} />
      <Display data={handleSearch()} />
    </div>
  )
}

export default App;