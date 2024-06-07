import { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';

import Loader from '../Loader/Loader';
import Card from '../Card/Card';
import Breadcrumbs from '../Header/Breadcrumbs';
import SideBar from '../SideBar/SideBar';

import { fetchData } from '../utils/fetchData';
import flagHandler from '../utils/flagHandler';
import tableColor from '../utils/tableColor';

import {
    WrapperDetails,
    Header,
    ContentWrapperRight,
} from '../../styles/GeneralStyles';

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
        const qualifyingResultsURL: string = `https://ergast.com/api/f1/2023/${round}/qualifying.json`;
        const raceResultsURL: string = `https://ergast.com/api/f1/2023/${round}/results.json`;

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
        { label: 'Races', route: '/races' },
        { label: `${crumb}`, route: `/races/${round}` },
    ];

    const raceCountryCode: string = raceDetails?.Circuit
        ? flagHandler(raceDetails.Circuit.Location.country)
        : '';

    return (
        <div className='content-wrapper'>
            <SideBar />
            <ContentWrapperRight>
                <Header>
                    <Breadcrumbs data={breadcrumbs} />
                </Header>
                <WrapperDetails>
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
                                        <td>
                                            <Link
                                                to={`/teams/${qualifyRes.Constructor.constructorId}`}
                                            >
                                                {qualifyRes.Constructor.name}
                                            </Link>
                                        </td>
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

                                const color: string = tableColor(
                                    raceRes.points,
                                    ''
                                );

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
                                        <td>
                                            <Link
                                                to={`/teams/${raceRes.Constructor.constructorId}`}
                                            >
                                                {raceRes.Constructor.name}
                                            </Link>
                                        </td>
                                        <td>
                                            {raceRes.Time
                                                ? raceRes.Time.time
                                                : raceRes.status}
                                        </td>
                                        <td style={{ backgroundColor: color }}>
                                            {raceRes.points}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </WrapperDetails>
            </ContentWrapperRight>
        </div>
    );
};

export default RaceDetails;
