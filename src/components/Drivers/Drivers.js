import { useEffect, useState } from 'react';
import axios from 'axios';
import './drivers.scss';

import nationalityToCountryCode from '../utils/flagHandler';

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
        <table>
            <caption>

            </caption>
            <thead>
                {drivers.length > 0 ? (

                    drivers.map((driver) => {
                        const countryCode = nationalityToCountryCode(
                            driver.Driver.nationality
                        );

                        return (
                            <tr key={driver.position}>
                                <td>
                                    {driver.position}
                                </td>
                                <td>
                                    <img
                                        src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
                                        alt={countryCode} />&nbsp;{driver.Driver.givenName}&nbsp;{driver.Driver.familyName}
                                </td>
                                <td>{driver.Constructors.length > 0 &&
                                    driver.Constructors[0].name}
                                </td>
                                <td>
                                    {driver.points}
                                </td>
                            </tr>
                        );
                    })
                ) : (
                    <td colSpan={4}>Loading drivers...</td>
                )}
            </thead>
        </table>
    );
};

export default Drivers;
