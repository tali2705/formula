import { useEffect, useState } from 'react';
import axios from 'axios';
import './races.scss';
import { useNavigate } from 'react-router-dom';

const Races = () => {
    const [races, setRaces] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getRaces();
    }, []);

    const getRaces = async () => {
        const url = 'http://ergast.com/api/f1/2013/results/1.json';
        try {
            const response = await axios.get(url);
            console.log(response.data);
            const raceStandings = response.data.MRData.RaceTable.Races;
            setRaces(raceStandings);
        }
        catch (error) {
            console.error(error);
        }
    };
    const handleRaceDetails = (round) => {
        // console.log(round);
        const link = `/raceDetails/${round}`;
        navigate(link);
    }
    return (
        <table>
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
                            <td onClick={() => handleRaceDetails(race.round)}>{race.raceName}</td>
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
