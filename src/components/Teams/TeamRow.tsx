import React from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { ITeamRow } from "../Interfaces/GlobalInterface";

import flagHandler from "../utils/flagHandler";

const TeamRow: React.FC<ITeamRow> = ({ team }) => {
  const navigate: NavigateFunction = useNavigate();

  const countryCode: string = flagHandler(team.Constructor.nationality);

  const handleTeamDetails = (): void => {
    navigate(`/teams/${team.Constructor.constructorId}`);
  };

  return (
    <tr>
      <td>{team.position}</td>
      <td onClick={handleTeamDetails}>
       
        <span>
          <img
            src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
            alt={countryCode}
            className="table-flag"
          />
          {team.Constructor.name}
        </span>
      </td>
      <td>
        <span className="flex">
          <Link to={team.Constructor.url} target="_blank">
            Details:
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32c0-17.7-14.3-32-32-32H352zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
            </svg>
          </Link>
        </span>
      </td>
      <td>{team.points}</td>
    </tr>
  );
};

export default TeamRow;
