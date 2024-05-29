import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../Loader';

import axios from 'axios';

import flagHandler from '../utils/flagHandler';
import Breadcrumbs from '../Header/BreadCrumbs';
import Card from '../Card/Card';

const DriverDetails = () => {
    const [driverResult, setDriverResult] = useState([]);
    const [driverDetails, setDriverDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();


    const getDriverDetails = useCallback(async () => {
        const url1 = `http://ergast.com/api/f1/2013/drivers/${params.driverId}/results.json`;
        const url2 = `http://ergast.com/api/f1/2013/drivers/${params.driverId}/driverStandings.json`;

        try {
            const response1 = await axios.get(url1);
            const result = response1.data.MRData.RaceTable.Races;
            const response2 = await axios.get(url2);
            const details = response2.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
            setDriverResult(result);
            setDriverDetails(details);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }, [params.driverId]);

    useEffect(() => {
        getDriverDetails();
    }, [getDriverDetails]);

    if (isLoading) { return <Loader />; }

    const crumb = driverResult[0].Results[0].Driver;
    console.log(driverDetails);
    const breadcrumbs = [
        { label: "F1 - Feeder", route: "/" },
        { label: "Drivers", route: "/" },
        { label: `${crumb.givenName} ${crumb.familyName}`, route: "/driver/:driverId" }
    ];
    // console.log(driverDetails);
    return (
        <>
            {/* <Breadcrumbs data={breadcrumbs} /> */}

            <Card
                title={`${driverDetails.Driver.givenName} ${driverDetails.Driver.familyName}`}
                caption1={`Country: `}
                caption2={`Team: `}
                caption3={`Birth: `}
                caption4={`Biography: `}
                text1={driverDetails.Driver.nationality}
                text2={driverDetails.Constructors[0].name}
                text3={driverDetails.Driver.dateOfBirth}
                text4={driverDetails.Driver.url}//I OVDE TREBA IKONICA
            />

            <table>
                <caption>Driver Details</caption>
                <thead>
                    <tr>
                        <th>Round</th>
                        <th>Flag</th>
                        <th>Race Name</th>
                        <th>Constructor</th>
                        <th>Grid</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    {driverResult.length > 0 ? (
                        driverResult.map((result) => {
                            const raceResult = result.Results[0];

                            const countryCode = flagHandler(
                                result.Circuit.Location.country
                            );
                            return (
                                <tr key={result.round}>
                                    <td>{result.round}</td>
                                    <td>
                                        <img
                                            src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
                                            alt={countryCode}
                                        />
                                    </td>
                                    <td>{result.raceName}</td>
                                    <td>{raceResult.Constructor.name}</td>
                                    <td>{raceResult.grid}</td>
                                    <td>{raceResult.position}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={6}>Loading driver details...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default DriverDetails;
