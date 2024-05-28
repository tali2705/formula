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

    const Results = () => {
        const [results, setResults] = useState([]);

        useEffect(() => {
            const getResults = async () => {
                const url = 'http://ergast.com/api/f1/2023/results/1.json';

                try {
                    const response = await axios.get(url);
                    console.log(response.data);

                    const raceResults = response.data.MRData.RaceTable.Races.Results;

                    setResults(raceResults);
                } catch (error) {
                    console.error(error);
                }
            };

            getResults();

            console.log('UseEffect getResults');
        }, []);

        console.log(results);

        return (
            <div>
                {results.length > 0 ? (
                    <ul>
                        {results.map((result, index) => (
                            <li key={index}>
                                {result.Driver.driverID} -
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading results...</p>
                )}
            </div>
        );
    };

    export default Races;
