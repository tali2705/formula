import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import Loader from "../../Loader";
import Card from "../Card/Card";
import Breadcrumbs from "../Header/Breadcrumbs";
import SideBar from "../SideBar/SideBar";

import { fetchData } from "../utils/fetchData";
import flagHandler from "../utils/flagHandler";

const DriverDetails = () => {
  const [driverResult, setDriverResult] = useState([]);
  const [driverDetails, setDriverDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { driverId } = useParams();

  const getDriverDetails = useCallback(async () => {
    const driverResultURL = `http://ergast.com/api/f1/2023/drivers/${driverId}/results.json`;
    const driverDetailsURL = `http://ergast.com/api/f1/2023/drivers/${driverId}/driverStandings.json`;

    const [driverResultsResponse, driverDetailsResponse] = await Promise.all([
      fetchData(driverResultURL),
      fetchData(driverDetailsURL),
    ]);

    const result = driverResultsResponse.MRData.RaceTable.Races;
    const details =
      driverDetailsResponse.MRData.StandingsTable.StandingsLists[0]
        .DriverStandings[0];

    setDriverResult(result);
    setDriverDetails(details);

    setIsLoading(false);
  }, [driverId]);

  useEffect(() => {
    getDriverDetails();
  }, [getDriverDetails]);

  if (isLoading) {
    return <Loader />;
  }

  const breadcrumbs = [
    { label: "F1 - Feeder", route: "/" },
    { label: "Drivers", route: "/drivers" },
    {
      label: `${driverResult[0].Results[0].Driver.givenName} ${driverResult[0].Results[0].Driver.familyName}`,
      route: `/drivers/${driverId}`,
    },
  ];

  const driverCountryCode =
    driverResult.length > 0
      ? flagHandler(driverResult[0].Results[0].Driver.nationality)
      : "";

  return (
    <div className="content-wrapper">
      <SideBar />
      <div className="content-wrapper-right">
        <div className="header">
          <Breadcrumbs data={breadcrumbs} />
        </div>
        <div className="wrapper-details">
          <Card
            title={`${driverDetails.Driver.givenName} ${driverDetails.Driver.familyName}`}
            caption1="Nationality: "
            caption2="Team: "
            caption3="Birth: "
            caption4="Biography: "
            text1={driverDetails.Driver.nationality}
            text2={driverDetails.Constructors[0].name}
            text3={driverDetails.Driver.dateOfBirth}
            text4={driverDetails.Driver.url}
            familyName={driverDetails.Driver.familyName}
            cardCountryCode={driverCountryCode}
            driverDetails={true}
          />
          <table>
            <caption>Driver Details</caption>
            <thead>
              <tr>
                <th>Round</th>
                <th>Race Name</th>
                <th>Constructor</th>
                <th>Grid</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              {driverResult.map((result) => {
                const raceResult = result.Results[0];
                const countryCode = flagHandler(
                  result.Circuit.Location.country
                );

                return (
                  <tr key={result.round}>
                    <td>{result.round}</td>
                    <td>
                      <img
                        className="table-flag"
                        src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
                        alt={countryCode}
                      />
                      {result.raceName}
                    </td>
                    <td>{raceResult.Constructor.name}</td>
                    <td>{raceResult.grid}</td>
                    <td>{raceResult.position}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DriverDetails;
