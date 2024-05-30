import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Loader from '../../Loader';
import Search from '../Header/Search';
import Header from '../Header/Header';

import { fetchData } from '../utils/fetchData';
import flagHandler from '../utils/flagHandler';
import { filterItems } from '../utils/filterItems'; // Import the filterItems helper

const Teams = () => {
    const [constructorStandings, setConstructorStandings] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [filteredTeams, setFilteredTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const getTeams = useCallback(async () => {
        try {
            const url =
                'http://ergast.com/api/f1/2023/constructorStandings.json';
            const data = await fetchData(url);

            const teamsArray =
                data.MRData.StandingsTable.StandingsLists[0]
                    .ConstructorStandings;
            setConstructorStandings(teamsArray);
            setFilteredTeams(teamsArray);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
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

    const onSearchChange = (event) => {
        const searchFieldString = event.target.value.toLowerCase();
        setSearchField(searchFieldString);
    };

    const handleTeamDetails = (constructorId) => {
        const link = `/teams/${constructorId}`;
        navigate(link);
    };

    if (isLoading) {
        return <Loader />;
    }

    const breadcrumbs = [
        { label: 'F1 - Feeder', route: '/' },
        { label: 'Teams', route: '/' },
    ];

    return (
        <>
            <Header data={breadcrumbs} />
            <Search
                onChangeHandler={onSearchChange}
                className='search-box'
                placeholder='Search...'
            />

            <h2 className='title'>Constructors Championship</h2>
            <table>
                <caption>
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
                        filteredTeams.map((team) => {
                            const countryCode = flagHandler(
                                team.Constructor.nationality
                            );

                            return (
                                <tr key={team.position}>
                                    <td>{team.position}</td>
                                    <td
                                        onClick={() =>
                                            handleTeamDetails(
                                                team.Constructor.constructorId
                                            )
                                        }
                                    >
                                        <img
                                            src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
                                            alt={countryCode}
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                            }}
                                        />
                                        {team.Constructor.name}
                                    </td>
                                    <td>Details: ICON</td>
                                    <td>{team.points}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan='3'>Loading teams...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default Teams;
