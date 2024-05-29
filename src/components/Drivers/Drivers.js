import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Search from '../Header/Search';

import flagHandler from '../utils/flagHandler';
import './drivers.scss';

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);

    const [searchField, setSearchField] = useState('');
    const [filteredDrivers, setFilteredDrivers] = useState([]);

    const navigate = useNavigate();

    const getDrivers = useCallback(async () => {
        try {
            const url = 'http://ergast.com/api/f1/2013/driverStandings.json';

            const response = await axios.get(url);

            const driverStandings =
                response.data.MRData.StandingsTable.StandingsLists[0]
                    .DriverStandings;

            setDrivers(driverStandings);
            setFilteredDrivers(driverStandings);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        getDrivers();
    }, [getDrivers]);

    useEffect(() => {
        const trimmedSearchField = searchField.trim();

        const newFilteredDrivers = drivers.filter((driver) =>
            `${driver.Driver.givenName} ${driver.Driver.familyName}`
                .toLowerCase()
                .includes(trimmedSearchField)
        );

        setFilteredDrivers(newFilteredDrivers);
    }, [drivers, searchField]);

    const onSearchChange = (event) => {
        const searchFieldString = event.target.value.toLowerCase();

        setSearchField(searchFieldString);
    };

    const driverDetailsHandler = (driverId) => {
        navigate(`/${driverId}`);
    };
    const breadcrumbs = [
        { label: "F1 - Feeder", route: "/" },
        { label: "Drivers", route: "/" },
    ];
    console.log(breadcrumbs);
    console.log(drivers);
    return (
        <>
            <Search
                onChangeHandler={onSearchChange}
                className='search-box'
                placeholder='Search...'
            />

            <table>
                <caption>Drivers</caption>

                <tbody>
                    {filteredDrivers.length > 0 ? (
                        filteredDrivers.map((driver) => {
                            const countryCode = flagHandler(
                                driver.Driver.nationality
                            );
                            return (
                                <tr key={driver.position}>
                                    <td>{driver.position}</td>
                                    <td>
                                        <img
                                            src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
                                            alt={countryCode}
                                        />
                                    </td>
                                    <td
                                        className='driver'
                                        onClick={() =>
                                            driverDetailsHandler(
                                                driver.Driver.driverId
                                            )
                                        }
                                    >
                                        &nbsp;{driver.Driver.givenName}&nbsp;
                                        {driver.Driver.familyName}
                                    </td>
                                    <td>
                                        {driver.Constructors.length > 0 &&
                                            driver.Constructors[0].name}
                                    </td>
                                    <td>{driver.points}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={5}>Loading drivers...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default Drivers;
