import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import flagHandler from '../utils/flagHandler';
import Loader from '../../Loader';
import Breadcrumbs from '../Header/BreadCrumbs';
import Card from '../Card/Card';

const TeamDetails = () => {
    const [teamDetails, setTeamsDetails] = useState([]);
    const [teamResults, setTeamsResult] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const param = useParams();
    const getTeamsDetails = useCallback(async () => {
        const url1 = `http://ergast.com/api/f1/2013/constructors/${param.constructorId}/results.json`;
        const url2 = `https://ergast.com/api/f1/2013/constructors/${param.constructorId}/constructorStandings.json`;

        try {
            const response1 = await axios.get(url1);
            // console.log(response1.data);
            const response2 = await axios.get(url2);
            // console.log(response2.data);
            const result = response1.data.MRData.RaceTable.Races;
            const details = response2.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0];
            setTeamsResult(result);
            setTeamsDetails(details);

            if (result.length > 0) {
                const firstRaceResults = result[0].Results;
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
    const crumb = teamResults[0].Results[0].Constructor.name;
    const breadcrumbs = [
        { label: "F1 - Feeder", route: "/" },
        { label: "Teams", route: "/" },
        { label: `${crumb}`, route: "/team/:constructorId" }
    ];
    console.log(teamDetails);
    return (
        <>
            <Breadcrumbs data={breadcrumbs} />

            <Card
                title={teamDetails.Constructor.name}
                caption1={`Country: `}
                caption2={`Position: `}
                caption3={`Points: `}
                caption4={`History: `}
                text1={teamDetails.Constructor.nationality}
                text2={teamDetails.position}
                text3={teamDetails.points}
                text4={teamDetails.Constructor.url}//OVDE TREBA STAVITI IKONICU, KAO I U TEAMS TABELU NA DETAILS
            />
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
                    {teamResults.length > 0 ? (
                        teamResults.map((result) => {
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
        </>
    );
};

export default TeamDetails;
