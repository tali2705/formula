import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Search from '../Header/Search';
import flagHandler from '../utils/flagHandler';

const Teams = () => {
    const [constructorStandings, setConstructorStandings] = useState([]);

    const [searchField, setSearchField] = useState('');
    const [filteredTeams, setFilteredTeams] = useState([]);

    const navigate = useNavigate();

    const getTeams = useCallback(async () => {
        try {
            const url =
                'http://ergast.com/api/f1/2013/constructorStandings.json';

            const response = await axios.get(url);

            const teamsArray =
                response.data.MRData.StandingsTable.StandingsLists[0]
                    .ConstructorStandings;

            setConstructorStandings(teamsArray);
            setFilteredTeams(teamsArray);
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        getTeams();
    }, [getTeams]);

    useEffect(() => {
        const trimmedSearchField = searchField.trim();

        const newFilteredTeams = constructorStandings.filter(
            (constructorStanding) =>
                constructorStanding.Constructor.name
                    .toLowerCase()
                    .includes(trimmedSearchField)
        );

        setFilteredTeams(newFilteredTeams);
    }, [constructorStandings, searchField]);

    const onSearchChange = (event) => {
        const searchFieldString = event.target.value.toLowerCase();

        setSearchField(searchFieldString);
    };

    const handleTeamDetails = (constructorId) => {
        const link = `/teams/${constructorId}`;

        navigate(link);
    };

    return (
        <>
            <Search
                onChangeHandler={onSearchChange}
                className='search-box'
                placeholder='Search...'
            />

            <table>
                <caption>
                    Constructors for Championship Standings - 2023
                </caption>

                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Constructor</th>
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
