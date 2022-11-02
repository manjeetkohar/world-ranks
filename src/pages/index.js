import Layout from '../components/Layouts/layout'
import styles from '../styles/Home.module.css'
import SearchInput from '../components/searchInput/searchInput'
import CountriesTable from '../components/CountriesTable/countriesTable'
import { useState } from 'react'


export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");
  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );
  console.log(filteredCountries.length)

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>Found {filteredCountries.length} countries</div>
        <div className={styles.search_box}>
          <SearchInput
            placeholder="Filter by Name, Region or SubRegion"
            onChange={onInputChange}
          />
        </div>

      </div>

      <CountriesTable countries={filteredCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.com/v2/all");
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};