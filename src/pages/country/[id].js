/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Layout from "../../components/Layouts/layout"
import Image from "next/image";
import styles from './country.module.css'
import { useEffect, useState } from "react";
import Link from "next/link";

// const getBorder = (country) => {
//     console.log(country.borders)
// }

const getCountry = async (id) => {
    try {
        const res = await fetch(`https://restcountries.com/v2/alpha/${id}`);
        const country = await res.json();
        return country;
    } catch (e) {

        console.log(e)
    }

}
const getCurrency = (country) => {
    var value = "";
    try {
        value = country.currencies.map(({ name, symbol }) => `${name}  ${symbol}`).toString();
    }
    catch (e) {
        console.log(e)
        value = "Currency Not Avai.";
    }
    return value;
}
const getBorder = (borders) => {
    try {
        return (borders.map((border) => (
            <div key={border.alpha3Code} className={styles.detail_panel_borders_country}>
                <img src={border.flag} alt={border.name} />
                <div className={styles.detail_panel_borders_name}>{border.name}</div>
            </div>
        )));
    } catch (e) {
        console.log(e);
        return <div>No Neighbouring Country</div>;
    }
}

const Country = ({ country }) => {
    const [borders, setBorders] = useState([]);
    const getBorders = async () => {
        try {
            var array = await Promise.all(country.borders.map((border) => getCountry(border)));
        } catch (e) { console.log(e) }
        setBorders(array);
    };


    useEffect(() => {

        getBorders();

    }, [])
    return (
        <Layout title={country.name}>
            <div className={styles.container}>
                <div className={styles.container_left} >
                    <div className={styles.overview_panel}>
                        <img src={country.flag} alt={country.name} ></img>
                        <h1 className={styles.overview_name} >{country.name}</h1>
                        <div className={styles.overview_region}>{country.region}</div>

                        <div className={styles.overview_numbers}>
                            <div className={styles.overview_population}>
                                <div className={styles.overview_value}>{country.population}</div>
                                <div className={styles.overview_label}>Population</div>
                            </div>


                            <div className={styles.overview_area}>
                                <div className={styles.overview_value}>{country.area} kms</div>
                                <div className={styles.overview_label}>Area</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.container_right}>
                    <div className={styles.detail_panel}>
                        <div className={styles.detail_panel_heading}>Details</div>
                        <div className={styles.detail_panel_rows}>
                            <div className={styles.detail_labels}>Capital</div>
                            <div className={styles.detail_values}>{country.capital}</div>
                        </div>
                        <div className={styles.detail_panel_rows}>
                            <div className={styles.detail_labels}>Subregion</div>
                            <div className={styles.detail_values}>{country.subregion}</div>
                        </div>
                        <div className={styles.detail_panel_rows}>
                            <div className={styles.detail_labels}>Languages</div>
                            <div className={styles.detail_values}>{country.languages.map(({ name }) => name).join(', ')}</div>
                        </div>
                        <div className={styles.detail_panel_rows}>
                            <div className={styles.detail_labels}>Currencies</div>
                            <div className={styles.detail_values}>{getCurrency(country)}</div>
                        </div>
                        <div className={styles.detail_panel_rows}>

                            <div className={styles.detail_labels}>Native name</div>
                            <div className={styles.detail_values}>{country.nativeName}</div>
                        </div>
                        <div className={styles.detail_panel_rows}>
                            <div className={styles.detail_labels}>Gini</div>
                            <div className={styles.detail_values}>{country.gini || 0} %</div>
                        </div>
                        <div className={styles.detail_panel_borders}>
                            <div className={styles.detail_panel_borders_label}>
                                Neighbouring Countries
                            </div>
                            <div className={styles.test}>
                                {
                                    getBorder(borders)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >);

}

export default Country;

export const getStaticPaths = async () => {
    const res = await fetch("https://restcountries.com/v2/all");
    const countries = await res.json();

    const paths = countries.map((country) => ({
        params: { id: country.alpha3Code },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async ({ params }) => {

    const country = await getCountry(params.id);
    return {
        props: {
            country,
        }
    }
}