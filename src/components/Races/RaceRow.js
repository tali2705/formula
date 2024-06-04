import React from "react";
import { Link, useNavigate } from "react-router-dom";

import flagHandler from "../utils/flagHandler";

const RaceRow = ({ race }) => {
  const navigate = useNavigate();

  const winner = race.Results[0].Driver;
  const countryCodeWinner = flagHandler(winner.nationality);
  const raceCountry = race.Circuit.Location.country;
  const countryCodeRace = flagHandler(raceCountry);

  const handleRaceDetails = (round) => {
    navigate(`/races/${round}`);
  };

  return (
    <tr>
      <td>{race.round}</td>
      <td onClick={() => handleRaceDetails(race.round)}>
        <span>
          <img
            src={`https://flagsapi.com/${countryCodeRace}/shiny/64.png`}
            alt={countryCodeRace}
            className="table-flag"
          />
          {race.raceName}
        </span>
      </td>
      <td>{race.Circuit.circuitName}</td>
      <td>{race.date}</td>
      <td>
        <span>
          <img
            src={`https://flagsapi.com/${countryCodeWinner}/shiny/64.png`}
            alt={countryCodeWinner}
            className="table-flag"
          />
          <Link to={`/drivers/${winner.driverId}`}>{winner.familyName}</Link>
        </span>
      </td>
    </tr>
  );
};

export default RaceRow;
