import React, { useEffect, useState, useCallback } from 'react';

import Loader from '../../Loader';
import Search from '../Header/Search';
import Header from '../Header/Header';
import DriverRow from './DriverRow';

import { fetchData } from '../utils/fetchData';
import { filterItems, onSearchChange } from '../utils/searchHandlers';

import {
    IDriverStanding,
    IApiResponseStandings,
    IBreadCrumby,
} from '../Interfaces/GlobalInterface';

const Drivers: React.FC = () => {
    const [drivers, setDrivers] = useState<IDriverStanding[]>([]);
    const [searchField, setSearchField] = useState<string>('');
    const [filteredDrivers, setFilteredDrivers] = useState<IDriverStanding[]>(
        []
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getDrivers = useCallback(async (): Promise<void> => {
        const url: string =
            'http://ergast.com/api/f1/2023/driverStandings.json';
        const data: IApiResponseStandings =
            await fetchData<IApiResponseStandings>(url);

        const driverStandings: IDriverStanding[] =
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
                (driver: IDriverStanding) =>
                    `${driver.Driver.givenName} ${driver.Driver.familyName}`
            )
        );
    }, [drivers, searchField]);

    if (isLoading) {
        return <Loader />;
    }

    const breadcrumbs: IBreadCrumby[] = [
        { label: 'F1 - Feeder', route: '/' },
        { label: 'Drivers', route: '/' },
    ];

    return (
        <>
            <div className='header'>
                <Header data={breadcrumbs} />
                <Search
                    onChangeHandler={onSearchChange(setSearchField)}
                    className='search-box'
                    placeholder='Search...'
                />
            </div>
            <div className='wrapper-content'>
                <h2 className='title'>Drivers Championship</h2>
                <table className='main-table'>
                    <caption className='table-caption'>
                        Drivers Championship Standings - 2023
                    </caption>
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
    );
};

export default Drivers;
