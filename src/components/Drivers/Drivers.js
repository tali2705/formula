import { useEffect, useState } from 'react';
import axios from 'axios';
import './drivers.scss';

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        getDrivers();

        console.log('UseEffect getDrivers');
    }, []);

    const getDrivers = async () => {
        const url = 'http://ergast.com/api/f1/2023/driverStandings.json';

        try {
            const response = await axios.get(url);
            console.log(response.data);

            const driverStandings =
                response.data.MRData.StandingsTable.StandingsLists[0]
                    .DriverStandings;

            console.log(driverStandings);
            setDrivers(driverStandings);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {drivers.length > 0 ? (
                <ul>
                    {drivers.map((driver, index) => (
                        <li key={index}>
                            {driver.Driver.givenName} {driver.Driver.familyName}
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
