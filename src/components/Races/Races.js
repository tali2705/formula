import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import flagHandler from '../utils/flagHandler';

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
        } catch (error) {
            console.error(error);
        }
    };

    const handleRaceDetails = (round) => {
        // console.log(round);
        const link = `/races/${round}`;
        navigate(link);
    };

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
                    races.map((race) => {
                        const winner = race.Results[0].Driver;
                        const countryCodeWinner = flagHandler(
                            winner.nationality
                        );

                        const raceCountry = race.Circuit.Location.country;
                        const countryCodeRace = flagHandler(raceCountry);
                        return (
                            <tr key={race.round}>
                                <td>{race.round}</td>
                                <td
                                    onClick={() =>
                                        handleRaceDetails(race.round)
                                    }
                                >
                                    <img
                                        src={`https://flagsapi.com/${countryCodeRace}/shiny/64.png`}
                                        alt={raceCountry}
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                        }}
                                    />
                                    {race.raceName}
                                </td>
                                <td>{race.Circuit.circuitName}</td>
                                <td>{race.date}</td>
                                <td>
                                    <img
                                        src={`https://flagsapi.com/${countryCodeWinner}/shiny/64.png`}
                                        alt={countryCodeWinner}
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                        }}
                                    />
                                    {winner.familyName}{' '}
                                </td>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan={7}>Loading races...</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Races;
