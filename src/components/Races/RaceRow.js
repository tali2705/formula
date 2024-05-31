import React from 'react';
import { useNavigate } from 'react-router-dom';

import flagHandler from '../utils/flagHandler';

const RaceRow = ({ race }) => {
    const navigate = useNavigate();
    const winner = race.Results[0].Driver;
    const countryCodeWinner = flagHandler(winner.nationality);
    const raceCountry = race.Circuit.Location.country;
    const countryCodeRace = flagHandler(raceCountry);

    const handleRaceDetails = (round) => {
        navigate(`/races/${round}`);
    };

    return (
        <tr key={race.round}>
            <td>{race.round}</td>
            <td onClick={() => handleRaceDetails(race.round)}>
                <img
                    src={`https://flagsapi.com/${countryCodeRace}/shiny/64.png`}
                    alt={countryCodeRace}
                    style={{ width: '32px', height: '32px' }}
                />
                {race.raceName}
            </td>
            <td className="race">{race.Circuit.circuitName}</td>
            <td>{race.date}</td>
            <td>
                <img
                    src={`https://flagsapi.com/${countryCodeWinner}/shiny/64.png`}
                    alt={countryCodeWinner}
                    style={{ width: '32px', height: '32px' }}
                />
                {winner.familyName}
            </td>
        </tr>
    );
};

export default RaceRow;
