import { useEffect, useState } from 'react';
import axios from 'axios';
import './QualifyingResults.scss';
import flagHandler from '../utils/flagHandler';

const getBestTime = (result) => {
    const times = [result.Q1, result.Q2, result.Q3].filter(Boolean);

    return times.sort()[0];
};

const QualifyingResults = () => {
    const [qualifyingResults, setQualifyingResults] = useState([]);

    useEffect(() => {
        getQualifyingResults();
    }, []);

    const getQualifyingResults = async () => {
        const url = 'http://ergast.com/api/f1/2013/qualifying.json';

        try {
            const response = await axios.get(url);

            const results =
                response.data.MRData.RaceTable.Races[0].QualifyingResults;
            setQualifyingResults(results);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Qualifying Results</h2>
            {qualifyingResults.length > 0 ? (
                <ul>
                    {qualifyingResults.map((result) => {
                        const countryCode = flagHandler(
                            result.Driver.nationality
                        );
                        const bestTime = getBestTime(result);

                        return (
                            <li key={result.Driver.driverId}>
                                {result.position} &nbsp;
                                <img
                                    src={`https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png`}
                                    alt={countryCode}
                                />
                                {result.Driver.givenName} &nbsp;
                                {result.Driver.familyName} &nbsp;
                                {result.Constructor.name} &nbsp; Best Time:
                                &nbsp; {bestTime}
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>Loading qualifying results...</p>
            )}
        </div>
    );
};

export default QualifyingResults;
