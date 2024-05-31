import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../../Loader';
import Card from '../Card/Card';
import Header from '../Header/Header';

import flagHandler from '../utils/flagHandler';
import { fetchData } from '../utils/fetchData';

const getBestTime = (result) => {
    const times = [result.Q1, result.Q2, result.Q3].filter(Boolean);

    return times.sort()[0];
};

const RaceDetails = () => {
    const [qualifyingResults, setQualifyingResults] = useState([]);
    const [raceDetails, setRaceDetails] = useState({});
    const [raceResult, setRaceResult] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();

    const getRaceDetails = useCallback(async () => {
        try {
            const url1 = `http://ergast.com/api/f1/2023/${params.round}/qualifying.json`;
            const url2 = `http://ergast.com/api/f1/2023/${params.round}/results.json`;

            const [response1, response2] = await Promise.all([
                fetchData(url1),
                fetchData(url2),
            ]);

            const qResults =
                response1.MRData.RaceTable.Races[0].QualifyingResults;
            const aboutRace = response1.MRData.RaceTable.Races[0];
            const rResults = response2.MRData.RaceTable.Races[0].Results;

            setQualifyingResults(qResults);
            setRaceDetails(aboutRace);
            setRaceResult(rResults);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }, [params.round]);

    useEffect(() => {
        getRaceDetails();
    }, [getRaceDetails]);

    const crumb = raceDetails.raceName;
    const breadcrumbs = [
        { label: 'F1 - Feeder', route: '/' },
        { label: 'Teams', route: '/' },
        { label: `${crumb}`, route: '/driver/:round' },
    ];

    const raceCountryCode = raceDetails.Circuit
        ? flagHandler(raceDetails.Circuit.Location.country)
        : '';

    return (
        <>
            {!isLoading ? (
                <div className='wrapper-details'>
                    <Header data={breadcrumbs} />
                    <Card
                        title={raceDetails.raceName}
                        caption1={`Country: `}
                        caption2={`Location: `}
                        caption3={`Date: `}
                        caption4={`Full report: `}
                        text1={raceDetails.Circuit.Location.country}
                        text2={raceDetails.Circuit.Location.locality}
                        text3={raceDetails.date}
                        text4={raceDetails.url}
                        round={raceDetails.round}
                        cardCountryCode={raceCountryCode}
                        raceDetails={raceDetails}
                    />
                    <div>
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

                        <table>
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
                                                <td>{raceRes.status}</td>
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
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default RaceDetails;
