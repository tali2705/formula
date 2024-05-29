import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import flagHandler from '../utils/flagHandler';
import Search from '../Header/Search';

const Races = () => {
    const [races, setRaces] = useState([]);

    const [searchField, setSearchField] = useState('');
    const [filteredRaces, setFilteredRaces] = useState([]);

    const navigate = useNavigate();

    const getRaces = useCallback(async () => {
        try {
            const url = 'http://ergast.com/api/f1/2013/results/1.json';

            const response = await axios.get(url);

            const raceStandings = response.data.MRData.RaceTable.Races;

            setRaces(raceStandings);
            setFilteredRaces(raceStandings);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        getRaces();
    }, [getRaces]);

    useEffect(() => {
        const trimmedSearchField = searchField.trim();
        const newFilteredRaces = races.filter((race) =>
            race.raceName.toLowerCase().includes(trimmedSearchField)
        );
        setFilteredRaces(newFilteredRaces);
    }, [races, searchField]);

    const onSearchChange = (event) => {
        const searchFieldString = event.target.value.toLowerCase().trim();

        setSearchField(searchFieldString);
    };

    const handleRaceDetails = (round) => {
        const link = `/races/${round}`;

        navigate(link);
    };
    const breadcrumbs = [
        { label: "F1 - Feeder", route: "/" },
        { label: "Races", route: "/races" },
    ];
    return (
        <>
            <Search
                onChangeHandler={onSearchChange}
                className='search-box'
                placeholder='Search races...'
            />

            <table>
                <thead>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>
                        <th>Circuit</th>
                        <th>Date</th>
                        <th>Winner</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredRaces.length > 0 ? (
                        filteredRaces.map((race) => {
                            const winner = race.Results[0].Driver;
                            const countryCodeWinner = flagHandler(
                                winner.nationality
                            );

                            const raceCountry = race.Circuit.Location.country;
                            const countryCodeRace = flagHandler(raceCountry);
                            return (
                                <tr key={race.round}>
                                    <td>{race.round}</td>
                                    <td
                                        onClick={() =>
                                            handleRaceDetails(race.round)
                                        }
                                    >
                                        <img
                                            src={`https://flagsapi.com/${countryCodeRace}/shiny/64.png`}
                                            alt={raceCountry}
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                            }}
                                        />
                                        {race.raceName}
                                    </td>
                                    <td>{race.Circuit.circuitName}</td>
                                    <td>{race.date}</td>
                                    <td>
                                        <img
                                            src={`https://flagsapi.com/${countryCodeWinner}/shiny/64.png`}
                                            alt={countryCodeWinner}
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                            }}
                                        />
                                        {winner.familyName}
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={5}>Loading races...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default Races;
