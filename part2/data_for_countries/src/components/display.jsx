import { useEffect, useState } from 'react';
import backend from '../services/backend';

export const SearchBar = ({ setValue }) => {
    const [localValue, setLocalValue] = useState('');
    return (
        <div>
            find countries
            <input value={localValue} onChange={(e) => setLocalValue(e.target.value)} />
            <button onClick={() => setValue(localValue)}> search </button>

        </div>
    )
}

const DisplayNone = () => {
    return (
        <div>
            No countries found, please reenter your query
        </div>
    )
}

const DisplayTooMuch = () => {
    return (
        <div>
            Too many countries, please reenter your query
        </div>
    )
}

const DisplayNameOnly = ({ data }) => {
    return (
        <div>
            {data.map(country => {
                return (
                    <div key={country.name.official}>
                        <CountryToggle country={country} />
                    </div>
                )
            })}
        </div>
    )
}

const DisplayOne = ({ data }) => {
    const [weather, setWeather] = useState(null);
    const country = data[0];
    const capital = country.capital[0];

    useEffect(() => {
        backend.getWeather(capital)
        .then(response =>
            setWeather(response)
        );
    }, [capital]);

    return (
        <>
            <h1>{country.name.common}</h1>
            <p>Capital
                {country.capital.map((city, id) => <span key={id}> {city} </span>)}
            </p>
            <p>Area {country.area}</p>
            <h1>Languages</h1>
            <ul>
                {Object.entries(country.languages).map(([key, language]) => (
                    <li key={key}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png} />
            {weather !== null && (
                <>
                    <h1>Weather in {country.capital[0]}</h1>
                    <p>Temperature: {weather.current.temp_c}°C (feels like {weather.current.feelslike_c}°C)</p>
                    <img src={weather.current.condition.icon} />
                    <p> Wind speed: {weather.current.wind_kph} </p>
                </>
            )}
        </>
    )
}

const CountryToggle = ({ country }) => {
    const [show, setShow] = useState(false);

    const toggleShow = () => setShow(show => !show);

    if (!show) {
        return (
            <div>
                {country.name.common}
                <button onClick={() => toggleShow()}>show</button>
            </div>
        );
    }

    return (
        <div>
            {country.name.common}
            <button onClick={() => toggleShow()}>hide</button>
            <DisplayOne data={[country]} />
        </div>
    );
}

export const Display = ({ data }) => {
    if (data === null) return;

    if (data.length === 0) return <DisplayNone />;
    else if (data.length >= 10) return <DisplayTooMuch />;
    else if (2 <= data.length && data.length <= 10) return <DisplayNameOnly data={data} />;

    // data.length === 1
    return <DisplayOne data={data} />;
}
