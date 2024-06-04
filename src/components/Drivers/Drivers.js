import { useEffect, useState, useCallback } from "react";

import Loader from "../../Loader";
import Search from "../Header/Search";
import Breadcrumbs from "../Header/Breadcrumbs";
import DriverRow from "./DriverRow";
import SideBar from "../SideBar/SideBar";

import { fetchData } from "../utils/fetchData";
import { filterItems, onSearchChange } from "../utils/searchHandlers";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getDrivers = useCallback(async () => {
    const url = "http://ergast.com/api/f1/2023/driverStandings.json";
    const data = await fetchData(url);

    const driverStandings =
      data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    setDrivers(driverStandings);
    setFilteredDrivers(driverStandings);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getDrivers();
  }, [getDrivers]);

  useEffect(() => {
    setFilteredDrivers(
      filterItems(
        drivers,
        searchField,
        (driver) => `${driver.Driver.givenName} ${driver.Driver.familyName}`
      )
    );
  }, [drivers, searchField]);
  if (isLoading) {
    return <Loader />;
  }

  const breadcrumbs = [
    { label: "F1 - Feeder", route: "/" },
    { label: "Drivers", route: "/" },
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
          <h2 className="title">DRIVERS CHAMIPONSHIP</h2>
          <table className="main-table">
            <caption className="table-caption">
              Drivers Championship Standings - 2023
            </caption>
            <tbody>
              {filteredDrivers.length > 0 ? (
                filteredDrivers.map((driver) => (
                  <DriverRow key={driver.position} driver={driver} />
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No results found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Drivers;
