import React, { useEffect, useState, useCallback } from 'react';

import Loader from '../Loader/Loader';
import Search from '../Header/Search';
import RaceRow from './RaceRow';
import Breadcrumbs from '../Header/Breadcrumbs';
import SideBar from '../SideBar/SideBar';

import { fetchData } from '../utils/fetchData';
import { filterItems, onSearchChange } from '../utils/searchHandlers';

import { IRace, IApiResponse, ICrumb } from '../Interfaces/GlobalInterface';

import { Header, ContentWrapperRight } from '../../styles/GeneralStyles';

const Races: React.FC = () => {
    const [races, setRaces] = useState<IRace[]>([]);
    const [searchField, setSearchField] = useState<string>('');
    const [filteredRaces, setFilteredRaces] = useState<IRace[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getRaces = useCallback(async (): Promise<void> => {
        const url: string = 'https://ergast.com/api/f1/2023/results/1.json';
        const data: IApiResponse = await fetchData<IApiResponse>(url);

        const raceStandings: IRace[] = data.MRData.RaceTable.Races;

        setRaces(raceStandings);
        setFilteredRaces(raceStandings);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        getRaces();
    }, [getRaces]);

    useEffect(() => {
        setFilteredRaces(
            filterItems(races, searchField, (race) => race.raceName)
        );
    }, [races, searchField]);

    if (isLoading) {
        return <Loader />;
    }

    const breadcrumbs: ICrumb[] = [{ label: 'Races', route: '/races' }];

    return (
        <div className='content-wrapper'>
            <SideBar />
            <ContentWrapperRight>
                <Header>
                    <Breadcrumbs data={breadcrumbs} />
                    <Search
                        onChangeHandler={onSearchChange(setSearchField)}
                        className='search-box'
                    />
                </Header>
                <div className='main-content'>
                    <h2 className='title'>RACE CALENDAR</h2>
                    <table>
                        <caption>Race Calendar - 2023</caption>
                        <thead>
                            <tr>
                                <th>Round</th>
                                <th>Grand Prix</th>
                                <th>Circuit</th>
                                <th>Date</th>
                                <th>Winner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRaces.length > 0 ? (
                                filteredRaces.map((race) => (
                                    <RaceRow key={race.round} race={race} />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5}>No results found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </ContentWrapperRight>
        </div>
    );
};

export default Races;
