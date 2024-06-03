import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../../Loader';
import Header from '../Header/Header';
import Card from '../Card/Card';

import { fetchData } from '../utils/fetchData';
import flagHandler from '../utils/flagHandler';

const TeamDetails = () => {
    const [teamDetails, setTeamDetails] = useState({});
    const [teamResults, setTeamResults] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { constructorId } = useParams();

    const getTeamDetails = useCallback(async () => {
        const url1 = `http://ergast.com/api/f1/2023/constructors/${constructorId}/results.json`;
        const url2 = `http://ergast.com/api/f1/2023/constructors/${constructorId}/constructorStandings.json`;

        const [response1, response2] = await Promise.all([
            fetchData(url1),
            fetchData(url2),
        ]);

        const result = response1.MRData.RaceTable.Races;
        const details =
            response2.MRData.StandingsTable.StandingsLists[0]
                .ConstructorStandings[0];

        setTeamResults(result);
        setTeamDetails(details);

        if (result.length > 0) {
            const firstRaceResults = result[0].Results;
            setDrivers([
                firstRaceResults[0]?.Driver.familyName || 'Driver 1',
                firstRaceResults[1]?.Driver.familyName || 'Driver 2',
            ]);
        }
        setIsLoading(false);
    }, [constructorId]);

    useEffect(() => {
        getTeamDetails();
    }, [getTeamDetails]);

    const crumb = teamDetails.Constructor?.name || 'Team Details';
    const breadcrumbs = [
        { label: 'F1 - Feeder', route: '/' },
        { label: 'Teams', route: '/teams' },
        { label: crumb, route: `/teams/${constructorId}` },
    ];

    const teamCountryCode = teamDetails.Constructor
        ? flagHandler(teamDetails.Constructor.nationality)
        : '';

    return (
        <>
            {!isLoading ? (
                <>
                    <div className='header'>
                        <Header data={breadcrumbs} />
                    </div>
                    <div className='wrapper-details'>
                        <Card
                            title={teamDetails.Constructor?.name}
                            caption1='Country: '
                            caption2='Position: '
                            caption3='Points: '
                            caption4='History: '
                            text1={teamDetails.Constructor?.nationality}
                            text2={teamDetails.position}
                            text3={teamDetails.points}
                            text4={teamDetails.Constructor?.url}
                            cardCountryCode={teamCountryCode}
                            teamId={teamDetails.Constructor.constructorId}
                            teamDetails={true}
                        />
                        <table>
                            <caption>Team Details</caption>
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
                                        const firstDriverPoints =
                                            raceResult[0]?.points;
                                        const secondDriverPoints =
                                            raceResult[1]?.points;
                                        const teamPoints =
                                            (firstDriverPoints
                                                ? +firstDriverPoints
                                                : 0) +
                                            (secondDriverPoints
                                                ? +secondDriverPoints
                                                : 0);

                                        return (
                                            <tr key={result.round}>
                                                <td>{result.round}</td>
                                                <td>
                                                    <img
                                                        src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
                                                        alt={
                                                            result.Circuit
                                                                .Location
                                                                .country
                                                        }
                                                        style={{
                                                            width: '32px',
                                                            height: '32px',
                                                        }}
                                                    />
                                                </td>
                                                <td>{result.raceName}</td>
                                                <td>
                                                    {firstDriverPoints || 'N/A'}
                                                </td>
                                                <td>
                                                    {secondDriverPoints ||
                                                        'N/A'}
                                                </td>
                                                <td>{teamPoints || 'N/A'}</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={6}>
                                            Loading team details...
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default TeamDetails;
