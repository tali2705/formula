import { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';

import Loader from '../Loader/Loader';
import Card from '../Card/Card';
import Breadcrumbs from '../Header/Breadcrumbs';
import SideBar from '../SideBar/SideBar';

import { fetchData } from '../utils/fetchData';
import flagHandler from '../utils/flagHandler';

import {
    IApiResponse,
    IRace,
    IQualifyingResult,
    IRaceResult,
    ICrumb,
} from '../Interfaces/GlobalInterface';

const RaceDetails: React.FC = () => {
    const [qualifyingResults, setQualifyingResults] = useState<
        IQualifyingResult[]
    >([]);
    const [raceDetails, setRaceDetails] = useState<IRace | null>(null);
    const [raceResult, setRaceResult] = useState<IRaceResult[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { round } = useParams<{ round: string | undefined }>();

    const getBestTime = (result: IQualifyingResult): string | undefined => {
        const times: string[] = [result.Q1, result.Q2, result.Q3].filter(
            (time) => time !== undefined
        );

        return times.sort()[0] || '';
    };

    const getRaceDetails = useCallback(async () => {
        const qualifyingResultsURL: string = `http://ergast.com/api/f1/2023/${round}/qualifying.json`;
        const raceResultsURL: string = `http://ergast.com/api/f1/2023/${round}/results.json`;

        const [qualifyingResultsResponse, raceResultsResponse]: [
            IApiResponse,
            IApiResponse
        ] = await Promise.all([
            fetchData<IApiResponse>(qualifyingResultsURL),
            fetchData<IApiResponse>(raceResultsURL),
        ]);

        const qResults: IQualifyingResult[] =
            qualifyingResultsResponse.MRData.RaceTable.Races[0]
                .QualifyingResults;
        const aboutRace: IRace =
            qualifyingResultsResponse.MRData.RaceTable.Races[0];
        const rResults: IRaceResult[] =
            raceResultsResponse.MRData.RaceTable.Races[0].Results;

        setQualifyingResults(qResults);
        setRaceDetails(aboutRace);
        setRaceResult(rResults);
        setIsLoading(false);
    }, [round]);

    useEffect(() => {
        getRaceDetails();
    }, [getRaceDetails]);

    if (isLoading) {
        return <Loader />;
    }

    const crumb: string | undefined = raceDetails?.raceName || 'Race Details';

    const breadcrumbs: ICrumb[] = [
        { label: 'F1 - Feeder', route: '/' },
        { label: 'Teams', route: '/' },
        { label: `${crumb}`, route: `/driver/${round}` },
    ];

    const raceCountryCode: string = raceDetails?.Circuit
        ? flagHandler(raceDetails.Circuit.Location.country)
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
                    {raceDetails && (
                        <Card
                            title={raceDetails.raceName}
                            caption1='Country: '
                            caption2='Location: '
                            caption3='Date: '
                            caption4='Full report: '
                            text1={raceDetails.Circuit.Location.country}
                            text2={raceDetails.Circuit.Location.locality}
                            text3={raceDetails.date}
                            text4={raceDetails.url}
                            round={raceDetails.round.toString()}
                            cardCountryCode={raceCountryCode}
                            raceDetails={true}
                        />
                    )}

                    <table>
                        <caption>Qualifying Results</caption>
                        <thead>
                            <tr>
                                <th>Pos</th>
                                <th>Driver</th>
                                <th>Team</th>
                                <th>Best Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {qualifyingResults.map((qualifyRes) => {
                                const countryCode: string = flagHandler(
                                    qualifyRes.Driver.nationality
                                );
                                const bestTime: string | undefined =
                                    getBestTime(qualifyRes);

                                return (
                                    <tr key={qualifyRes.position}>
                                        <td>{qualifyRes.position}</td>
                                        <td>
                                            <span>
                                                <img
                                                    src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
                                                    alt={countryCode}
                                                    className='table-flag'
                                                />
                                                <Link
                                                    to={`/drivers/${qualifyRes.Driver.driverId}`}
                                                >
                                                    {
                                                        qualifyRes.Driver
                                                            .familyName
                                                    }
                                                </Link>
                                            </span>
                                        </td>
                                        <td>{qualifyRes.Constructor.name}</td>
                                        <td>{bestTime}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <table>
                        <caption>Race Results</caption>
                        <thead>
                            <tr>
                                <th>Pos</th>
                                <th>Driver</th>
                                <th>Team</th>
                                <th>Result</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {raceResult.map((raceRes) => {
                                const countryCode: string = flagHandler(
                                    raceRes.Driver.nationality
                                );

                                const color: string = getColor(raceRes.points);

                                return (
                                    <tr key={raceRes.position}>
                                        <td>{raceRes.position}</td>
                                        <td>
                                            <span className='flex'>
                                                <img
                                                    src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
                                                    alt={countryCode}
                                                    className='table-flag'
                                                />
                                                <Link
                                                    to={`/drivers/${raceRes.Driver.driverId}`}
                                                >
                                                    {raceRes.Driver.familyName}
                                                </Link>
                                            </span>
                                        </td>
                                        <td>{raceRes.Constructor.name}</td>
                                        <td>
                                            {raceRes.Time
                                                ? raceRes.Time.time
                                                : raceRes.status}
                                        </td>
                                        <td
                                            className='defaultPositionColor'
                                            style={{ backgroundColor: color }}
                                        >
                                            {raceRes.points}
                                        </td>
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

export default RaceDetails;
