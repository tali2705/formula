import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from '../../Loader';
import flagHandler from '../utils/flagHandler';
import Card from '../Card/Card';
import Breadcrumbs from "../Header/BreadCrumbs";

const getBestTime = (result) => {
    const times = [result.Q1, result.Q2, result.Q3].filter(Boolean);

    return times.sort()[0];
};

const RaceDetails = () => {
    const [qualifyingResults, setQualifyingResults] = useState({});
    const [raceDetails, setRaceDetails] = useState({});
    const [raceResult, setRaceResult] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();


    useEffect(() => {
        getRaceDetails();
    }, []);

    const getRaceDetails = async () => {
        try {
            const url1 = `http://ergast.com/api/f1/2013/${params.round}/qualifying.json`;
            const url2 = `http://ergast.com/api/f1/2013/${params.round}/results.json`;
            const response1 = await axios.get(url1);
            const response2 = await axios.get(url2);
            const qResults = response1.data.MRData.RaceTable.Races[0].QualifyingResults;
            const aboutRace = response1.data.MRData.RaceTable.Races[0];
            const rResults = response2.data.MRData.RaceTable.Races[0].Results;
            setQualifyingResults(qResults);
            setRaceDetails(aboutRace);
            setRaceResult(rResults);
            setIsLoading(false);
        }
        catch (err) {
            console.log(err);
        }
    }
    if (isLoading) { return <Loader />; }
    const crumb = raceDetails.raceName;
    const breadcrumbs = [
        { label: "F1 - Feeder", route: "/" },
        { label: "Teams", route: "/" },
        { label: `${crumb}`, route: "/driver/:round" }
    ];
    return (
        <>
            <Breadcrumbs data={breadcrumbs} />
            <Card
                title={raceDetails.raceName}
                caption1={`Country: `}
                caption2={`Location: `}
                caption3={`Date: `}
                caption4={`Full report: `}
                text1={raceDetails.Circuit.Location.country}
                text2={raceDetails.Circuit.Location.locality}
                text3={raceDetails.date}
            />
            <div>
                <table>
                    <caption>
                        Qualifying Results
                    </caption>
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
                                const bestTime = getBestTime(qualifyRes);

                                return (
                                    <tr key={qualifyRes.position}>
                                        <td>{qualifyRes.position}</td>
                                        <td><img
                                            src={`https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png`}
                                            alt={countryCode} />{qualifyRes.Driver.familyName}</td>
                                        <td>{qualifyRes.Constructor.name}</td>
                                        <td>{bestTime}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <td colSpan={4}>Loading drivers...</td>
                        )}
                    </tbody>
                </table>

                <table>
                    <caption>
                        Race Results
                    </caption>
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
                        {raceResult.length > 0 ? (
                            raceResult.map((result) => {
                                const countryCode = flagHandler(
                                    result.Driver.nationality
                                );

                                return (
                                    <tr key={result.position}>
                                        <td>{result.position}</td>
                                        <td><img
                                            src={`https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png`}
                                            alt={countryCode} />{result.Driver.familyName}</td>
                                        <td>{result.Constructor.name}</td>
                                        <td>{result.Time
                                            ? result.Time.time
                                            : 'No time available'}{' '}</td>
                                        <td>{result.points}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <td colSpan={4}>Loading drivers...</td>
                        )}
                    </tbody>
                </table>
            </div>


        </>
    );
}
export default RaceDetails;