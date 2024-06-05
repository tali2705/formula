import { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';

import Loader from '../Loader/Loader';
import Card from '../Card/Card';
import Breadcrumbs from '../Header/Breadcrumbs';
import SideBar from '../SideBar/SideBar';

import { fetchData } from '../utils/fetchData';
import flagHandler from '../utils/flagHandler';

import {
    ITeamRace,
    IApiResponseTeamResults,
    IApiResponseTeamStandings,
    ITeamStanding,
    ITeamRaceResult,
    ICrumb,
} from '../Interfaces/GlobalInterface';

const TeamDetails: () => JSX.Element = () => {
    const [teamDetails, setTeamDetails] = useState<ITeamStanding | null>(null);
    const [teamResults, setTeamResults] = useState<ITeamRace[]>([]);
    const [drivers, setDrivers] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { constructorId } = useParams<{
        constructorId: string | undefined;
    }>();

    const getTeamDetails = useCallback(async (): Promise<void> => {
        const teamResultURL: string = `http://ergast.com/api/f1/2023/constructors/${constructorId}/results.json`;
        const teamDetailsURL: string = `http://ergast.com/api/f1/2023/constructors/${constructorId}/constructorStandings.json`;

        const [teamResultResponse, teamDetailsResponse]: [
            IApiResponseTeamResults,
            IApiResponseTeamStandings
        ] = await Promise.all([
            fetchData<IApiResponseTeamResults>(teamResultURL),
            fetchData<IApiResponseTeamStandings>(teamDetailsURL),
        ]);

        const result: ITeamRace[] = teamResultResponse.MRData.RaceTable.Races;
        const details: ITeamStanding =
            teamDetailsResponse.MRData.StandingsTable.StandingsLists[0]
                .ConstructorStandings[0];

        const driversRaceResults: ITeamRaceResult[] = result[0].Results;

        setDrivers([
            driversRaceResults[0]?.Driver.familyName || 'Driver 1',
            driversRaceResults[1]?.Driver.familyName || 'Driver 2',
        ]);
        setTeamResults(result);
        setTeamDetails(details);
        setIsLoading(false);
    }, [constructorId]);

    useEffect(() => {
        getTeamDetails();
    }, [getTeamDetails]);

    if (isLoading) {
        return <Loader />;
    }

    const crumb: string | undefined =
        teamDetails?.Constructor?.name || 'Team Details';

    const breadcrumbs: ICrumb[] = [
        { label: 'F1 - Feeder', route: '/' },
        { label: 'Teams', route: '/teams' },
        { label: crumb, route: `/teams/${constructorId}` },
    ];

    const teamCountryCode: string = teamDetails?.Constructor
        ? flagHandler(teamDetails?.Constructor.nationality)
        : '';

    const pointsColorMap: { [key: string]: string } = {
        '26': '#b04888',
        '25': '#b04888',
        '19': '#b04888',
        '18': '#bf6c9f',
        '15': '#cf91b7',
        '12': '#dfb5cf',
        '10': '#efdae7',
    };

    const getColor = (points?: string): string => {
        return points && pointsColorMap[points] ? pointsColorMap[points] : '';
    };

    return (
        <div className='content-wrapper'>
            <SideBar />
            <div className='content-wrapper-right'>
                <div className='header'>
                    <Breadcrumbs data={breadcrumbs} />
                </div>
                <div className='wrapper-details'>
                    {teamDetails && (
                        <Card
                            title={teamDetails.Constructor.name || ''}
                            caption1='Country: '
                            caption2='Position: '
                            caption3='Points: '
                            caption4='History: '
                            text1={teamDetails.Constructor.nationality || ''}
                            text2={teamDetails.position || ''}
                            text3={teamDetails.points || ''}
                            text4={teamDetails.Constructor.url || ''}
                            cardCountryCode={teamCountryCode}
                            teamId={teamDetails.Constructor.constructorId}
                            teamDetails={true}
                        />
                    )}

                    <table>
                        <caption>Team Details</caption>
                        <thead>
                            <tr>
                                <th>Round</th>
                                <th>Grand Prix</th>
                                <th>{drivers[0]}</th>
                                <th>{drivers[1]}</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamResults.map((result) => {
                                const raceResult: ITeamRaceResult[] =
                                    result.Results;
                                const countryCode: string = flagHandler(
                                    result.Circuit.Location.country
                                );
                                const firstDriverPoints: string =
                                    raceResult[0]?.points;
                                const secondDriverPoints: string =
                                    raceResult[1]?.points;
                                const teamPoints: number =
                                    +firstDriverPoints + +secondDriverPoints;
                                const colorFirstDriver: string =
                                    getColor(firstDriverPoints);
                                const colorSecondDriver: string =
                                    getColor(secondDriverPoints);
                                return (
                                    <tr key={result.round}>
                                        <td>{result.round}</td>
                                        <td>
                                            <img
                                                src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
                                                alt={
                                                    result.Circuit.Location
                                                        .country
                                                }
                                                className='table-flag'
                                            />
                                            <Link to={`/races/${result.round}`}>
                                                {result.raceName}
                                            </Link>
                                        </td>
                                        <td
                                            className='defaultPositionColor'
                                            style={{
                                                backgroundColor:
                                                    colorFirstDriver,
                                            }}
                                        >
                                            {firstDriverPoints || '0'}
                                        </td>
                                        <td
                                            className='defaultPositionColor'
                                            style={{
                                                backgroundColor:
                                                    colorSecondDriver,
                                            }}
                                        >
                                            {secondDriverPoints || '0'}
                                        </td>
                                        <td>{teamPoints || '0'}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeamDetails;
