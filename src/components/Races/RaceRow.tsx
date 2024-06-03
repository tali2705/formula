import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import flagHandler from '../utils/flagHandler';

import { IDriver, IRaceRowProps } from '../Interfaces/GlobalInterface';

const RaceRow: React.FC<IRaceRowProps> = ({ race }) => {
    const navigate: NavigateFunction = useNavigate();

    const winner: IDriver = race.Results[0].Driver;
    const countryCodeWinner: string = flagHandler(winner.nationality);
    const raceCountry: string = race.Circuit.Location.country;
    const countryCodeRace: string = flagHandler(raceCountry);

    const handleRaceDetails = (round: number): void => {
        navigate(`/races/${round}`);
    };

    return (
        <tr>
            <td>{race.round}</td>
            <td onClick={() => handleRaceDetails(race.round)}>
                <img
                    src={`https://flagsapi.com/${countryCodeRace}/shiny/64.png`}
                    alt={countryCodeRace}
                    style={{ width: '32px', height: '32px' }}
                />
                {race.raceName}
            </td>
            <td>{race.Circuit.circuitName}</td>
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
