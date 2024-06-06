import React, { useEffect, useState, useCallback } from 'react';

import Loader from '../Loader/Loader';
import Search from '../Header/Search';
import Breadcrumbs from '../Header/Breadcrumbs';
import DriverRow from './DriverRow';
import SideBar from '../SideBar/SideBar';

import { fetchData } from '../utils/fetchData';
import { filterItems, onSearchChange } from '../utils/searchHandlers';
import {
    IApiResponseStandings,
    ICrumb,
    IDriverStanding,
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

    const breadcrumbs: ICrumb[] = [{ label: 'Drivers', route: '/' }];

    return (
        <div className='content-wrapper'>
            <SideBar />
            <div className='content-wrapper-right'>
                <div className='header'>
                    <Breadcrumbs data={breadcrumbs} />
                    <Search
                        onChangeHandler={onSearchChange(setSearchField)}
                        className='search-box'
                    />
                </div>
                <div className='main-content'>
                    <h2 className='title'>DRIVERS CHAMIPONSHIP</h2>
                    <table>
                        <caption>Drivers Championship Standings - 2023</caption>
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
                                    <td colSpan={5}>No results found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Drivers;
