import { useEffect, useState } from 'react';
import axios from 'axios';
import './races.scss';
import flagHandler from '../utils/flagHandler';

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
                <tr>
                    <th>Round</th>
                    <th>Flag</th>
                    <th>Grand Prix</th>
                    <th>Circuit</th>
                    <th>Date</th>
                    <th>Winner</th>
                    <th>Flag</th>
                </tr>
            </thead>
            <tbody>
                {races.length > 0 ? (
                    races.map((race, index) => {
                        const winner = race.Results[0].Driver;
                        const countryCodeWinner = flagHandler(
                            winner.nationality
                        );

                        const raceCountry = race.Circuit.Location.country;
                        const countryCodeRace = flagHandler(raceCountry);

                        return (
                            <tr key={index}>
                                <td>{race.round}</td>
                                <td>
                                    <img
                                        src={`https://flagsapi.com/${countryCodeRace}/shiny/64.png`}
                                        alt={raceCountry}
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                        }}
                                    />
                                </td>
                                <td>{race.raceName}</td>
                                <td>{race.Circuit.circuitName}</td>
                                <td>{race.date}</td>
                                <td>{winner.familyName}</td>
                                <td>
                                    <img
                                        src={`https://flagsapi.com/${countryCodeWinner}/shiny/64.png`}
                                        alt={countryCodeWinner}
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                        }}
                                    />
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
