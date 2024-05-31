import React from "react";
import { useNavigate } from "react-router-dom";

import flagHandler from "../utils/flagHandler";

const DriverRow = ({ driver }) => {
  const navigate = useNavigate();

  const countryCode = flagHandler(driver.Driver.nationality);

  const handleDriverDetails = () => {
    navigate(`/${driver.Driver.driverId}`);
  };

  return (
    <tr key={driver.position}>
      <td>{driver.position}</td>
      <td>
        <img
          className="table-flag"
          src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
          alt={countryCode}
        />
      </td>
      <td className="driver" onClick={handleDriverDetails}>
        &nbsp;{driver.Driver.givenName}&nbsp;{driver.Driver.familyName}
      </td>
      <td>{driver.Constructors.length > 0 && driver.Constructors[0].name}</td>
      <td>{driver.points}</td>
    </tr>
  );
};

export default DriverRow;
