import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import flagHandler from '../utils/flagHandler';

const DriverDetails = () => {
    const [driverDetails, setDriverDetails] = useState([]);
    const params = useParams();


    const getDriverDetails = useCallback(async () => {
        const url = `http://ergast.com/api/f1/2013/drivers/${params.driverId}/results.json`;

        try {
            const response = await axios.get(url);
            const driverResults = response.data.MRData.RaceTable.Races;

            setDriverDetails(driverResults);
        } catch (error) {
            console.error(error);
        }
    }, [params.driverId]);

    useEffect(() => {
        getDriverDetails();
    }, [getDriverDetails]);

    return (
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
                {driverDetails.length > 0 ? (
                    driverDetails.map((result) => {
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
    );
};

export default DriverDetails;
