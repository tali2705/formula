import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchData } from '../utils/fetchData';
import { filterItems } from '../utils/search';

import Search from '../Header/Search';
import Loader from '../../Loader';
import Breadcrumbs from '../Header/BreadCrumbs';
import DriverRow from './DriverRow';

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [filteredDrivers, setFilteredDrivers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const getDrivers = useCallback(async () => {
        const url = 'http://ergast.com/api/f1/2013/driverStandings.json';
        const data = await fetchData(url);

        if (data) {
            const driverStandings =
                data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
            setDrivers(driverStandings);
            setFilteredDrivers(driverStandings);
        }
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

    const onSearchChange = (event) => {
        setSearchField(event.target.value.toLowerCase());
    };

    const driverDetailsHandler = (driverId) => {
        navigate(`/${driverId}`);
    };

    const breadcrumbs = [
        { label: 'F1 - Feeder', route: '/' },
        { label: 'Drivers', route: '/' },
    ];

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Breadcrumbs data={breadcrumbs} />
                    <Search
                        onChangeHandler={onSearchChange}
                        className='search-box'
                        placeholder='Search...'
                    />
                    <table>
                        <caption>Drivers</caption>
                        <tbody>
                            {filteredDrivers.length > 0 ? (
                                filteredDrivers.map((driver) => (
                                    <DriverRow
                                        key={driver.position}
                                        driver={driver}
                                        onClick={() =>
                                            driverDetailsHandler(
                                                driver.Driver.driverId
                                            )
                                        }
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5}>Loading drivers...</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
};

export default Drivers;
