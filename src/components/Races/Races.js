import { useEffect, useState, useCallback } from "react";

import Loader from "../../Loader";
import Search from "../Header/Search";
import Header from "../Header/Header";
import RaceRow from "./RaceRow";

import { fetchData } from "../utils/fetchData";
import { filterItems, onSearchChange } from "../utils/searchHandlers";

const Races = () => {
  const [races, setRaces] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [filteredRaces, setFilteredRaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getRaces = useCallback(async () => {
    const url = "http://ergast.com/api/f1/2023/results/1.json";
    const data = await fetchData(url);

    const raceStandings = await data.MRData.RaceTable.Races;

    setRaces(raceStandings);
    setFilteredRaces(raceStandings);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getRaces();
  }, [getRaces]);

  useEffect(() => {
    setFilteredRaces(filterItems(races, searchField, (race) => race.raceName));
  }, [races, searchField]);

  if (isLoading) {
    return <Loader />;
  }
  const breadcrumbs = [
    { label: "F1 - Feeder", route: "/" },
    { label: "Races", route: "/races" },
  ];

  return (
    <>
      <div className="header">
        <Header data={breadcrumbs} />
        <Search
          onChangeHandler={onSearchChange(setSearchField)}
          className="search-box"
          placeholder="Search races..."
        />
      </div>
      <div className="wrapper-content">
        <h2 className="title">Race Calendar</h2>
        <table>
          <caption>Race Calendar - 2023</caption>
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
            {filteredRaces.map((race) => (
              <RaceRow key={race.round} race={race} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Races;
