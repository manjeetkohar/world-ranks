/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import styles from "./countriesTable.module.css"
import { useState } from 'react'
import Link from "next/link";

const orderBy = (countries, value, direction) => {
    // console.log(array[value], value)
    if (direction === 'asc') {
        return [...countries].sort((a, b) => a[value] > b[value] ? 1 : -1);
    }
    if (direction === 'desc') {
        return [...countries].sort((a, b) => a[value] > b[value] ? -1 : 1);
    }
    else {
        return countries
    }
}

const CountriesTable = ({ countries }) => {
    const [direction, setDirection] = useState();
    const [value, setValue] = useState();
    const orderedCountries = orderBy(countries, value, direction);
    const switchDirection = () => {
        if (direction === "asc") {
            setDirection("desc");
        } else if (direction === "desc") {
            setDirection("asc");
        } else {
            setDirection("asc");
        }
    };

    const setValueAndDirection = (value) => {
        switchDirection();
        setValue(value);
    }
    return (
        <div className={styles.body}>
            <div className={styles.heading}>
                <div className={styles.heading_flag}>
                    Flags
                </div>

                <button onClick={() => setValueAndDirection('name')} className={styles.heading_name}>
                    <div>
                        Name
                    </div>
                </button>
                <button onClick={() => setValueAndDirection('population')} className={styles.heading_population}>
                    <div>
                        Population
                    </div>
                </button>
                <button onClick={() => setValueAndDirection('area')} className={styles.heading_area}>
                    <div>
                        Area
                    </div>
                </button>
                <button onClick={() => setValueAndDirection('gini')} className={styles.heading_gini}>
                    <div>
                        Gini
                    </div>
                </button>
            </div>
            <div>
                {orderedCountries.map((country, index) => (
                    <Link key={country.name} href={`/country/${country.alpha3Code}`}>
                        <div className={styles.row} key={index}>
                            <div className={styles.flag}><img src={country.flag} width="100" height="50" alt=""></img></div>
                            <div className={styles.name}>{country.name}</div>
                            <div className={styles.population}>{country.population}</div>
                            <div className={styles.area}>{country.area}</div>
                            <div className={styles.gini}>{`${country.gini || 0} %`}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
export default CountriesTable;