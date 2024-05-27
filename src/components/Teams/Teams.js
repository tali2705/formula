import { useState, useEffect } from 'react';
import './teams.scss';
import axios from 'axios';

const Teams = () => {
    const [teams, setTeams] = useState({});
    const [constructorStandings, setConstructorStandings] = useState([]);

    useEffect(() => {
        getTeams();
    }, []);

    const getTeams = async () => {
        try {
            const url = 'http://ergast.com/api/f1/2013/constructorStandings.json';
            const response = await axios.get(url);
            const teams = response.data;
            setTeams(teams);
            const teamsArray = teams.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
            setConstructorStandings(teamsArray);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <table>
            <caption>Constructors for championship Standings - 2013</caption>
            <tbody>
                {constructorStandings.length > 0 ? (

                    constructorStandings.map((team) => (

                        <tr key={team.position}>
                            <td>{team.position}</td>
                            <td>{team.Constructor.name}</td>
                            <td>{team.points}</td>
                        </tr>

                    ))

                ) : (
                    <p>Loading drivers...</p>
                )}
            </tbody>
        </table>
    );
}
export default Teams;