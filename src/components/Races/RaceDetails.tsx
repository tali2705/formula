import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../../Loader';
import Header from '../Header/Header';
import Card from '../Card/Card';

import { fetchData } from '../utils/fetchData';
import flagHandler from '../utils/flagHandler';

import {
    IApiResponse,
    IRace,
    IQualifyingResult,
    IRaceResult,
} from '../Interfaces/GlobalInterface';

const getBestTime = (result: IQualifyingResult): string => {
    const times = [result.Q1, result.Q2, result.Q3].filter(Boolean);
    return times.sort()[0];
};

const RaceDetails: React.FC = () => {
    const [qualifyingResults, setQualifyingResults] = useState<
        IQualifyingResult[]
    >([]);
    const [raceDetails, setRaceDetails] = useState<IRace | null>(null);
    const [raceResult, setRaceResult] = useState<IRaceResult[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { round } = useParams<{ round: string }>();

    const getRaceDetails = useCallback(async () => {
        const url1 = `http://ergast.com/api/f1/2023/${round}/qualifying.json`;
        const url2 = `http://ergast.com/api/f1/2023/${round}/results.json`;

        const [response1, response2]: [IApiResponse, IApiResponse] =
            await Promise.all([
                fetchData<IApiResponse>(url1),
                fetchData<IApiResponse>(url2),
            ]);

        const qResults = response1.MRData.RaceTable.Races[0].QualifyingResults;
        const aboutRace = response1.MRData.RaceTable.Races[0];
        const rResults = response2.MRData.RaceTable.Races[0].Results;

        setQualifyingResults(qResults);
        setRaceDetails(aboutRace);
        setRaceResult(rResults);
        setIsLoading(false);
    }, [round]);

    useEffect(() => {
        getRaceDetails();
    }, [getRaceDetails]);

    const crumb = raceDetails?.raceName;
    const breadcrumbs = [
        { label: 'F1 - Feeder', route: '/' },
        { label: 'Teams', route: '/' },
        { label: `${crumb}`, route: `/driver/${round}` },
    ];

    const raceCountryCode = raceDetails?.Circuit
        ? flagHandler(raceDetails.Circuit.Location.country)
        : '';

    return (
        <>
            {!isLoading ? (
                <>
                    <div className='header'>
                        <Header data={breadcrumbs} />
                    </div>
                    <div className='wrapper-details flex'>
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
                                {qualifyingResults.length > 0 ? (
                                    qualifyingResults.map((qualifyRes) => {
                                        const countryCode = flagHandler(
                                            qualifyRes.Driver.nationality
                                        );
                                        const bestTime =
                                            getBestTime(qualifyRes);

                                        return (
                                            <tr key={qualifyRes.position}>
                                                <td>{qualifyRes.position}</td>
                                                <td>
                                                    <img
                                                        src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
                                                        alt={countryCode}
                                                        style={{
                                                            width: '32px',
                                                            height: '32px',
                                                        }}
                                                    />
                                                    {
                                                        qualifyRes.Driver
                                                            .familyName
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        qualifyRes.Constructor
                                                            .name
                                                    }
                                                </td>
                                                <td>{bestTime}</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={4}>Loading drivers...</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <table className='width90'>
                            <caption>Race Results</caption>
                            <thead>
                                <tr>
                                    <th>Pos</th>
                                    <th>Driver</th>
                                    <th>Team</th>
                                    <th>Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {raceResult.length > 0 ? (
                                    raceResult.map((raceRes) => {
                                        const countryCode = flagHandler(
                                            raceRes.Driver.nationality
                                        );

                                        return (
                                            <tr key={raceRes.position}>
                                                <td>{raceRes.position}</td>
                                                <td>
                                                    <img
                                                        src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
                                                        alt={countryCode}
                                                        style={{
                                                            width: '32px',
                                                            height: '32px',
                                                        }}
                                                    />
                                                    {raceRes.Driver.familyName}
                                                </td>
                                                <td>
                                                    {raceRes.Constructor.name}
                                                </td>
                                                <td>
                                                    {raceRes.Time
                                                        ? raceRes.Time.time
                                                        : raceRes.status}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={4}>Loading results...</td>
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

export default RaceDetails;
