import { useEffect, useState } from 'react';
import axios from 'axios';
import './races.scss';

const Races = () => {
    const [races, setRaces] = useState([]);

    useEffect(() => {
        const getRaces = async () => {
            const url = 'http://ergast.com/api/f1/2013/results/1.json';

            try {
                const response = await axios.get(url);
                console.log(response.data);

                const raceStandings = response.data.MRData.RaceTable.Races;

                setRaces(raceStandings);
            } catch (error) {
                console.error(error);
            }
        };

        getRaces();

        console.log('UseEffect getRaces');
    }, []);

    console.log(races);

    return (
        <table>
            <thead>
                <th>Round</th>
                <th>Grand Prix</th>
                <th>Circuit</th>
                <th>Date</th>
                <th>Winner</th>
            </thead>
            <tbody>
                {races.length > 0 ? (
                    races.map((race, index) => (
                        <tr>
                            <td>{race.round}</td>
                            <td>{race.raceName}</td>
                            <td>{race.Circuit.circuitName}</td>
                            <td>{race.date}</td>
                            <td>{race.Results[0].Driver.familyName}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5}>Loading races...</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Races;
