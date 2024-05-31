import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Loader from '../../Loader';
import Search from '../Header/Search';
import Header from '../Header/Header';

import { fetchData } from '../utils/fetchData';
import flagHandler from '../utils/flagHandler';
import { filterItems } from '../utils/filterItems'; // Import the filterItems helper

const Races = () => {
    const [races, setRaces] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [filteredRaces, setFilteredRaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const getRaces = useCallback(async () => {
        try {
            const url = 'http://ergast.com/api/f1/2023/results/1.json';
            const data = await fetchData(url);

            const raceStandings = data.MRData.RaceTable.Races;
            setRaces(raceStandings);
            setFilteredRaces(raceStandings);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        getRaces();
    }, [getRaces]);

    useEffect(() => {
        setFilteredRaces(
            filterItems(races, searchField, (race) => race.raceName)
        );
    }, [races, searchField]);

    const onSearchChange = (event) => {
        const searchFieldString = event.target.value.toLowerCase();
        setSearchField(searchFieldString);
    };

    const handleRaceDetails = (round) => {
        const link = `/races/${round}`;
        navigate(link);
    };

    if (isLoading) {
        return <Loader />;
    }

    const breadcrumbs = [
        { label: 'F1 - Feeder', route: '/' },
        { label: 'Races', route: '/races' },
    ];

    return (
        <>
            <Header data={breadcrumbs} />
            <Search
                onChangeHandler={onSearchChange}
                className='search-box'
                placeholder='Search races...'
            />
            <div className='wrapper-content'>
                <h2 className='title'>Race Calendar</h2>
                <table className='main-table'>
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

                                const raceCountry =
                                    race.Circuit.Location.country;
                                const countryCodeRace =
                                    flagHandler(raceCountry);

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
                                                alt={countryCodeRace}
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
                                <td colSpan={5}>No races found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Races;
