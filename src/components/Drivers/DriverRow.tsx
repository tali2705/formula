import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import flagHandler from '../utils/flagHandler';
import { IDriverRow } from '../Interfaces/GlobalInterface';

const DriverRow: React.FC<{ driver: IDriverRow }> = ({ driver }) => {
    const navigate: NavigateFunction = useNavigate();

    const countryCode: string = flagHandler(driver.Driver.nationality);

    const handleDriverDetails = (): void => {
        navigate(`/${driver.Driver.driverId}`);
    };

    return (
        <tr>
            <td>{driver.position}</td>
            <td>
                <img
                    className='table-flag'
                    src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
                    alt={countryCode}
                />
            </td>
            <td className='driver' onClick={handleDriverDetails}>
                &nbsp;{driver.Driver.givenName}&nbsp;{driver.Driver.familyName}
            </td>
            <td>
                {driver.Constructors.length > 0 && driver.Constructors[0].name}
            </td>
            <td>{driver.points}</td>
        </tr>
    );
};

export default DriverRow;
