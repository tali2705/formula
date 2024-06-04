import React from "react";
import { useNavigate } from "react-router-dom";

import flagHandler from "../utils/flagHandler";

const DriverRow = ({ driver }) => {
  const navigate = useNavigate();

  const countryCode = flagHandler(driver.Driver.nationality);

  const handleDriverDetails = () => {
    navigate(`/drivers/${driver.Driver.driverId}`);
  };

  return (
    <tr>
      <td>{driver.position}</td>
      <td className="driver" onClick={handleDriverDetails}>
        <img
          className="table-flag"
          src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
          alt={countryCode}
        />{" "}
        {driver.Driver.givenName} {driver.Driver.familyName}
      </td>
      <td>{driver.Constructors.length > 0 && driver.Constructors[0].name}</td>
      <td>{driver.points}</td>
    </tr>
  );
};

export default DriverRow;
