import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import flagHandler from '../utils/flagHandler';
import Loader from '../../Loader';

const TeamDetails = () => {
    const [teamsDetails, setTeamsDetails] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const param = useParams();
    const getTeamsDetails = useCallback(async () => {
        const url = `http://ergast.com/api/f1/2013/constructors/${param.constructorId}/results.json`;

        try {
            const response = await axios.get(url);
            const teamsResults = response.data.MRData.RaceTable.Races;
            setTeamsDetails(teamsResults);

            if (teamsResults.length > 0) {
                const firstRaceResults = teamsResults[0].Results;
                setDrivers([
                    firstRaceResults[0]?.Driver.familyName || 'Driver 1',
                    firstRaceResults[1]?.Driver.familyName || 'Driver 2',
                ]);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }, [param.constructorId]);

    useEffect(() => {
        getTeamsDetails();
    }, [getTeamsDetails]);

    if (isLoading) { return <Loader />; }

    return (
        <table>
            <caption>Teams Details</caption>
            <thead>
                <tr>
                    <th>Round</th>
                    <th>Flag</th>
                    <th>Grand Prix</th>
                    <th>{drivers[0]}</th>
                    <th>{drivers[1]}</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                {teamsDetails.length > 0 ? (
                    teamsDetails.map((result) => {
                        const raceResult = result.Results;
                        const countryCode = flagHandler(
                            result.Circuit.Location.country
                        );
                        const firstDriverPoints = raceResult[0]?.points;
                        const secondDriverPoints = raceResult[1]?.points;
                        const teamPoints =
                            (firstDriverPoints ? +firstDriverPoints : 0) +
                            (secondDriverPoints ? +secondDriverPoints : 0);

                        return (
                            <tr key={result.round}>
                                <td>{result.round}</td>
                                <td>
                                    <img
                                        src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
                                        alt={result.Circuit.Location.country}
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                        }}
                                    />
                                </td>
                                <td>{result.raceName}</td>
                                <td>{firstDriverPoints || 'N/A'}</td>
                                <td>{secondDriverPoints || 'N/A'}</td>
                                <td>{teamPoints || 'N/A'}</td>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan={6}>Loading team details...</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default TeamDetails;
