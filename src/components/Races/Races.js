import { useEffect, useState } from 'react';
import axios from 'axios';
import './races.scss';
import Loader from '../Loader';

const Races = () => {
    const [races, setRaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getRaces();
    }, []);

    const getRaces = async () => {
        const url = 'http://ergast.com/api/f1/2013/results/1.json';

        try {
            const response = await axios.get(url);
            // console.log(response.data);

            const raceStandings = response.data.MRData.RaceTable.Races;
            setRaces(raceStandings);
            setIsLoading(false);

        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return <Loader />
    }
    return (
        <table>
            <caption>Race calendar - 2013</caption>
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
                {races.length > 0 ? (
                    races.map((race) => (
                        <tr key={race.round}>
                            <td>{race.round}</td>
                            <td>{race.raceName}</td>
                            <td>{race.Circuit.circuitName}</td>
                            <td>{race.date}</td>
                            <td>{race.Results[0].Driver.familyName}</td>
                        </tr>
                    ))
                ) : (
                    <p>Loading races...</p>
                )
                }
            </tbody>
        </table >
    );
};

export default Races;
