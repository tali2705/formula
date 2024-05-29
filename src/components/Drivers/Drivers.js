import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './drivers.scss';
import flagHandler from '../utils/flagHandler';

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getDrivers();
    }, []);

    const getDrivers = async () => {
        const url = 'http://ergast.com/api/f1/2013/driverStandings.json';

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

    const driverDetailsHandler = (driverId) => {
        navigate(`/${driverId}`);
    };
    console.log(drivers);
    return (
        <table>
            <caption>Drivers</caption>
            <tbody>
                {drivers.length > 0 ? (
                    drivers.map((driver) => {
                        const countryCode = flagHandler(
                            driver.Driver.nationality
                        );
                        return (
                            <tr key={driver.position}>
                                <td>{driver.position}</td>
                                <td>
                                    <img
                                        src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
                                        alt={countryCode}
                                    />
                                </td>
                                <td
                                    className='driver'
                                    onClick={() =>
                                        driverDetailsHandler(
                                            driver.Driver.driverId
                                        )
                                    }
                                >
                                    &nbsp;{driver.Driver.givenName}&nbsp;
                                    {driver.Driver.familyName}
                                </td>
                                <td>
                                    {driver.Constructors.length > 0 &&
                                        driver.Constructors[0].name}
                                </td>
                                <td>{driver.points}</td>
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
    );
};

export default Drivers;