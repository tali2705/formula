import { useEffect, useState } from 'react';
import axios from 'axios';
import './races.scss';

const Races = () => {
    const [races, setRaces] = useState([]);

    useEffect(() => {
        const getRaces = async () => {
            const url = 'http://ergast.com/api/f1/2023/results/1.json';

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
        <div>
            {races.length > 0 ? (
                <ul>
                    {races.map((race, index) => (
                        <li key={index}>
                            {race.raceName} - {race.season}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading races...</p>
            )}
        </div>
    );
};

export default Races;
