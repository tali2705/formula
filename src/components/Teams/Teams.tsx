import React, { useState, useEffect, useCallback } from 'react';

import Loader from '../Loader/Loader';
import Search from '../Header/Search';
import Breadcrumbs from '../Header/Breadcrumbs';
import TeamRow from './TeamRow';

import { fetchData } from '../utils/fetchData';
import { filterItems, onSearchChange } from '../utils/searchHandlers';
import SideBar from '../SideBar/SideBar';

import { Header, ContentWrapperRight } from '../../styles/GeneralStyles';

import {
    IApiResponseTeamStanding,
    ICrumb,
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
            'https://ergast.com/api/f1/2023/constructorStandings.json';
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

    if (isLoading) {
        return <Loader />;
    }

    const breadcrumbs: ICrumb[] = [{ label: 'Teams', route: '/' }];

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
                    <h2 className='title'>CONSTRUCTORS CHAMPIONSHIP</h2>
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
                                    <TeamRow key={team.position} team={team} />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4}>No results found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </ContentWrapperRight>
        </div>
    );
};

export default Teams;
