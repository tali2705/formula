import { useEffect, useState } from 'react';
import axios from 'axios';
import './races.scss';

const Races = () => {
    const [races, setRaces] = useState([]);

    useEffect(() => {
        getRaces();

        console.log('UseEffect getRaces');
    }, []);

    const getRaces = async () => {
        const url = 'http://ergast.com/api/f1/2023/results/1.json';

        try {
            const response = await axios.get(url);
            console.log(response.data);

            const raceStandings =
                response.data.MRData.RaceTable.Races[4].raceName;

            const raceSeason = response.data.MRData.RaceTable.season;

            console.log(raceStandings);
            console.log(raceSeason);
            setRaces(raceStandings);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {Races.length > 0 ? (
                <ul>
                    {Races.map((race, index) => (
                        <li key={index}>
                            {race.Races[1]} {race.Races[4]}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading racess...</p>
            )}
        </div>
    );
};

export default Races;
