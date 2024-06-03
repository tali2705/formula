import React, { useEffect, useState, useCallback } from 'react';

import Loader from '../../Loader';
import Search from '../Header/Search';
import Header from '../Header/Header';
import RaceRow from './RaceRow';

import { fetchData } from '../utils/fetchData';
import { filterItems, onSearchChange } from '../utils/searchHandlers';

import { IRace, IApiResponse } from '../Interfaces/GlobalInterface';

const Races: React.FC = () => {
    const [races, setRaces] = useState<IRace[]>([]);
    const [searchField, setSearchField] = useState<string>('');
    const [filteredRaces, setFilteredRaces] = useState<IRace[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getRaces = useCallback(async (): Promise<void> => {
        const url: string = 'http://ergast.com/api/f1/2023/results/1.json';
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

    const breadcrumbs: {
        label: string;
        route: string;
    }[] = [
        { label: 'F1 - Feeder', route: '/' },
        { label: 'Races', route: '/races' },
    ];

    return (
        <>
            {!isLoading ? (
                <>
                    <div className='header'>
                        <Header data={breadcrumbs} />
                        <Search
                            onChangeHandler={onSearchChange(setSearchField)}
                            className='search-box'
                            placeholder='Search races...'
                        />
                    </div>
                    <div className='wrapper-content'>
                        <h2 className='title'>Race Calendar</h2>
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
                                        <td colSpan={5}>No races found.</td>
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

export default Races;
