import { useState, useEffect, useCallback } from 'react';

import Loader from '../../Loader';
import Search from '../Header/Search';
import Header from '../Header/Header';
import TeamRow from './TeamRow';

import { fetchData } from '../utils/fetchData';
import { filterItems, onSearchChange } from '../utils/searchHandlers';

import {
    IApiResponseTeamStanding,
    ITeamStanding,
} from '../Interfaces/GlobalInterface';

const Teams: React.FC = () => {
    const [constructorStandings, setConstructorStandings] = useState<
        ITeamStanding[]
    >([]);
    const [searchField, setSearchField] = useState<string>('');
    const [filteredTeams, setFilteredTeams] = useState<ITeamStanding[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getTeams = useCallback(async (): Promise<void> => {
        const url: string =
            'http://ergast.com/api/f1/2023/constructorStandings.json';
        const data: IApiResponseTeamStanding =
            await fetchData<IApiResponseTeamStanding>(url);

        const teamsStandings: ITeamStanding[] =
            data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

        setConstructorStandings(teamsStandings);
        setFilteredTeams(teamsStandings);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        getTeams();
    }, [getTeams]);

    useEffect(() => {
        setFilteredTeams(
            filterItems(
                constructorStandings,
                searchField,
                (team) => team.Constructor.name
            )
        );
    }, [constructorStandings, searchField]);

    const breadcrumbs: {
        label: string;
        route: string;
    }[] = [
        { label: 'F1 - Feeder', route: '/' },
        { label: 'Teams', route: '/' },
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
                            placeholder='Search...'
                        />
                    </div>
                    <div className='wrapper-content'>
                        <h2 className='title'>Constructors Championship</h2>
                        <table className='main-table'>
                            <caption className='table-caption'>
                                Constructors for Championship Standings - 2023
                            </caption>

                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Constructor</th>
                                    <th>Details</th>
                                    <th>Points</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredTeams.length > 0 ? (
                                    filteredTeams.map((team) => (
                                        <TeamRow
                                            key={team.position}
                                            team={team}
                                        />
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3}>Loading teams...</td>
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

export default Teams;
