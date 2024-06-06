import React from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";

import flagHandler from "../utils/flagHandler";
import { IDriverRow } from "../Interfaces/GlobalInterface";

const DriverRow: React.FC<{ driver: IDriverRow }> = ({ driver }) => {
  const navigate: NavigateFunction = useNavigate();

  const countryCode: string = flagHandler(driver.Driver.nationality);

  const handleDriverDetails = (): void => {
    navigate(`/drivers/${driver.Driver.driverId}`);
  };

  return (
    <tr>
      <td>{driver.position}</td>
      <td onClick={handleDriverDetails}>
        <span className="flex">
          <img
            className="table-flag"
            src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
            alt={countryCode}
          />{" "}
          {driver.Driver.givenName} {driver.Driver.familyName}
        </span>
      </td>
      <td>
        <Link to={`/teams/${driver.Constructors[0].constructorId}`}>
          {driver.Constructors.length > 0 && driver.Constructors[0].name}
        </Link>
      </td>
      <td>{driver.points}</td>
    </tr>
  );
};

export default DriverRow;
