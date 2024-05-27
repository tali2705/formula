import { useState, useEffect } from 'react';
// import { CircleLoader } from 'react-spinners';
import './teams.scss';
import axios from 'axios';
import Loader from '../../Loader';

const Teams = () => {
    const [teams, setTeams] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getTeams();
    }, []);

    const getTeams = async () => {
        try {
            const url = 'http://ergast.com/api/f1/2013/constructorStandings.json';
            const response = await axios.get(url);
            const teams = response.data;
            // const teamsArray = Object.values(response.data);
            setTeams(teams);
            // console.log(teams);
            setIsLoading(false);
            const constructorStandings = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
            console.log(constructorStandings);

        }
        catch (err) {
            console.log(err);
        }
    }
    if (isLoading) {
        return (<div>
            <Loader />
        </div>)
    }
    return (
        <table>
            <caption>Constructors for championship Standings - 2013</caption>
            <tbody>
                <tr></tr>
            </tbody>
        </table>
    );
}
export default Teams;