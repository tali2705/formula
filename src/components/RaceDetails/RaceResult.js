import { useEffect, useState } from 'react';
import axios from 'axios';
import './RaceResult.scss';
import flagHandler from '../utils/flagHandler';

const RaceResult = () => {
    const [raceResults, setRaceResults] = useState([]);

    useEffect(() => {
        getRaceResults();
    }, []);

    const getRaceResults = async () => {
        const url = 'https://ergast.com/api/f1/2013/results.json';

        try {
            const response = await axios.get(url);
            const results = response.data.MRData.RaceTable.Races[0].Results;

            setRaceResults(results);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Race results    </h2>
            {raceResults.length > 0 ? (
                <ul>
                    {raceResults.map((result) => {
                        const countryCode = flagHandler(
                            result.Driver.nationality
                        );

                        return (
                            <li key={result.Driver.driverId}>
                                {result.position} &nbsp;
                                <img
                                    src={`https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png`}
                                    alt={countryCode}
                                />
                                {result.Driver.givenName} &nbsp;
                                {result.Driver.familyName} &nbsp;
                                {result.Constructor.name} &nbsp;
                                {result.Time
                                    ? result.Time.time
                                    : 'No time available'}{' '}
                                &nbsp;
                                {result.points} &nbsp;
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>Loading race results...</p>
            )}
        </div>
    );
};

export default RaceResult;
