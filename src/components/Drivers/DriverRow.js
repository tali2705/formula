import React from 'react';

import flagHandler from '../utils/flagHandler';

const DriverRow = ({ driver, onClick }) => {
    const countryCode = flagHandler(driver.Driver.nationality);

    return (
        <tr key={driver.position}>
            <td>{driver.position}</td>
            <td>
                <img
                    src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
                    alt={countryCode}
                />
            </td>
            <td className='driver' onClick={onClick}>
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
