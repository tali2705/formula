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
=======
        <table>
            <caption>

            </caption>
            <tbody>
                {drivers.length > 0 ? (

                    drivers.map((driver) => {
                        const countryCode = nationalityToCountryCode(
>>>>>>> bf55322a5f08f29402edabae3d2e273a26b44ec9
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
            </tbody>
        </table>
    );
};

export default Drivers;
