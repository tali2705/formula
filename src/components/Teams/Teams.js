import { useState, useEffect } from 'react';
import axios from 'axios';
import flagHandler from '../utils/flagHandler';

const Teams = () => {
    const [constructorStandings, setConstructorStandings] = useState([]);

    useEffect(() => {
        getTeams();
    }, []);

    const getTeams = async () => {
        try {
            const url =
                'http://ergast.com/api/f1/2013/constructorStandings.json';

            const response = await axios.get(url);
            const teamsArray =
                response.data.MRData.StandingsTable.StandingsLists[0]
                    .ConstructorStandings;

            setConstructorStandings(teamsArray);
        } catch (err) {
            console.log(err);
        }
    };

    const handleTeamDetails = () => { };

    return (
        <table>
            <caption>Constructors for Championship Standings - 2023</caption>
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Constructor</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                {constructorStandings.length > 0 ? (
                    constructorStandings.map((team) => {
                        const countryCode = flagHandler(
                            team.Constructor.nationality
                        );

                        return (
                            <tr key={team.position}>
                                <td>{team.position}</td>
                                <td onClick={handleTeamDetails}>
                                    <img
                                        src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
                                        alt={team.Constructor.nationality}
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
    );
};

export default Teams;
