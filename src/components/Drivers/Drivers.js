import { useEffect, useState, useCallback } from 'react';

import Loader from '../../Loader';
import Search from '../Header/Search';
import Header from '../Header/Header';
import DriverRow from './DriverRow';

import { fetchData } from '../utils/fetchData';
import { filterItems, onSearchChange } from '../utils/searchHandlers';

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [filteredDrivers, setFilteredDrivers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getDrivers = useCallback(async () => {
        const url = 'http://ergast.com/api/f1/2023/driverStandings.json';
        const data = await fetchData(url);

        const driverStandings =
            data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

        setDrivers(driverStandings);
        setFilteredDrivers(driverStandings);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        getDrivers();
    }, [getDrivers]);

    useEffect(() => {
        setFilteredDrivers(
            filterItems(
                drivers,
                searchField,
                (driver) =>
                    `${driver.Driver.givenName} ${driver.Driver.familyName}`
            )
        );
    }, [drivers, searchField]);

    const breadcrumbs = [
        { label: 'F1 - Feeder', route: '/' },
        { label: 'Drivers', route: '/' },
    ];

    return (
        <>
            {!isLoading ? (
                <>
                    <Header data={breadcrumbs} />
                    <Search
                        onChangeHandler={onSearchChange(setSearchField)}
                        className='search-box'
                        placeholder='Search...'
                    />
                    <div className='wrapper-content'>
                        <h2 className='title'>Drivers Championship</h2>
                        <table className='main-table'>
                            <caption className='table-caption'>Drivers</caption>
                            <tbody>
                                {filteredDrivers.length > 0 ? (
                                    filteredDrivers.map((driver) => (
                                        <DriverRow
                                            key={driver.position}
                                            driver={driver}
                                        />
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5}>Loading drivers...</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default Drivers;
