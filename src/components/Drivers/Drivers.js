import { useEffect, useState } from 'react';
import axios from 'axios';
import './drivers.scss';

import flagHandler from '../utils/flagHandler';

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        getDrivers();
    }, []);

    const getDrivers = async () => {
        const url = 'http://ergast.com/api/f1/2023/driverStandings.json';

        try {
            const response = await axios.get(url);

            const driverStandings =
                response.data.MRData.StandingsTable.StandingsLists[0]
                    .DriverStandings;

            setDrivers(driverStandings);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {drivers.length > 0 ? (
                <ul>
                    {drivers.map((driver, index) => {
                        const countryCode = flagHandler(
                            driver.Driver.nationality
                        );

                        return (
                            <li key={index}>
                                <img
                                    src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
                                    alt={countryCode}
                                />
                                {driver.position}
                                &nbsp;
                                {driver.Driver.givenName}
                                &nbsp;
                                {driver.Driver.familyName}
                                &nbsp;
                                {driver.Constructors.length > 0 &&
                                    driver.Constructors[0].name}
                                &nbsp;
                                {driver.points}
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>Loading drivers...</p>
            )}
        </div>
    );
};

export default Drivers;
