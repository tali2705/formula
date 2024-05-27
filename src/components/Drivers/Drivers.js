import { useEffect, useState } from 'react';
import axios from 'axios';
import './drivers.scss';

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
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

        getDrivers();
    }, []);

    console.log(drivers);

    return (
        <div>
            {drivers.length > 0 ? (
                <ul>
                    {drivers.map((driver, index) => (
                        <li key={index}>
                            {driver.Driver.givenName} {driver.Driver.familyName}
                            &nbsp;
                            {driver.Constructors.length > 0 &&
                                driver.Constructors[0].name}
                            &nbsp;
                            {driver.position} &nbsp; {driver.points}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading drivers...</p>
            )}
        </div>
    );
};

export default Drivers;
