import React from 'react';
import { useNavigate } from 'react-router-dom';

import flagHandler from '../utils/flagHandler';

const TeamRow = ({ team }) => {
    const navigate = useNavigate();

    const countryCode = flagHandler(team.Constructor.nationality);

    const handleTeamDetails = () => {
        navigate(`/teams/${team.Constructor.constructorId}`);
    };

    return (
        <tr key={team.position}>
            <td>{team.position}</td>
            <td onClick={handleTeamDetails}>
                <img
                    src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
                    alt={countryCode}
                    style={{ width: '32px', height: '32px' }}
                />
                {team.Constructor.name}
            </td>
            <td>Details: ICON</td>
            <td>{team.points}</td>
        </tr>
    );
};

export default TeamRow;
