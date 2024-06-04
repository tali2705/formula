import { useState, useEffect, useCallback } from "react";

import Loader from "../../Loader";
import Search from "../Header/Search";
import Breadcrumbs from "../Header/Breadcrumbs";
import TeamRow from "./TeamRow";

import { fetchData } from "../utils/fetchData";
import { filterItems, onSearchChange } from "../utils/searchHandlers";
import SideBar from "../SideBar/SideBar";

const Teams = () => {
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTeams = useCallback(async () => {
    const url = "http://ergast.com/api/f1/2023/constructorStandings.json";
    const data = await fetchData(url);

    const teamsStandings =
      data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

    setConstructorStandings(teamsStandings);
    setFilteredTeams(teamsStandings);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getTeams();
  }, [getTeams]);

  useEffect(() => {
    setFilteredTeams(
      filterItems(
        constructorStandings,
        searchField,
        (team) => team.Constructor.name
      )
    );
  }, [constructorStandings, searchField]);

  if (isLoading) {
    return <Loader />;
  }

  const breadcrumbs = [
    { label: "F1 - Feeder", route: "/" },
    { label: "Teams", route: "/teams" },
  ];

  return (
    <div className="content-wrapper">
      <SideBar />
      <div className="content-wrapper-right">
        <div className="header">
          <Breadcrumbs data={breadcrumbs} />
          <Search
            onChangeHandler={onSearchChange(setSearchField)}
            className="search-box"
          />
        </div>
        <div className="main-content">
          <h2 className="title">Constructors Championship</h2>
          <table className="main-table">
            <caption className="table-caption">
              Constructors for Championship Standings - 2023
            </caption>

            <thead>
              <tr>
                <th>Position</th>
                <th>Constructor</th>
                <th>Details</th>
                <th>Points</th>
              </tr>
            </thead>

            <tbody>
              {filteredTeams.length > 0 ? (
                filteredTeams.map((team) => (
                  <TeamRow key={team.position} team={team} />
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No results found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Teams;
