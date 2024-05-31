import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import { fetchData } from "../utils/fetchData";
import flagHandler from "../utils/flagHandler";

import Loader from "../../Loader";
import Header from "../Header/Header";
import Card from "../Card/Card";

const DriverDetails = () => {
  const [driverResult, setDriverResult] = useState([]);
  const [driverDetails, setDriverDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { driverId } = useParams();

  const getDriverDetails = useCallback(async () => {
    const url1 = `http://ergast.com/api/f1/2023/drivers/${driverId}/results.json`;
    const url2 = `http://ergast.com/api/f1/2023/drivers/${driverId}/driverStandings.json`;

    const data1 = await fetchData(url1);
    const data2 = await fetchData(url2);

    if (data1 && data2) {
      const result = data1.MRData.RaceTable.Races;
      const details =
        data2.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];

      setDriverResult(result);
      setDriverDetails(details);
    }
    setIsLoading(false);
  }, [driverId]);

  useEffect(() => {
    getDriverDetails();
  }, [getDriverDetails]);

  const breadcrumbs =
    driverResult.length > 0
      ? [
          { label: "F1 - Feeder", route: "/" },
          { label: "Drivers", route: "/" },
          {
            label: `${driverResult[0].Results[0].Driver.givenName} ${driverResult[0].Results[0].Driver.familyName}`,
            route: `/driver/${driverId}`,
          },
        ]
      : [];

  const driverCountryCode =
    driverResult.length > 0
      ? flagHandler(driverResult[0].Results[0].Driver.nationality)
      : "";

  return (
    <>
      {!isLoading ? (
        <>
          <Header data={breadcrumbs} />
          <div className="wrapper-details">
            <Card
              title={`${driverDetails.Driver.givenName} ${driverDetails.Driver.familyName}`}
              caption1="Country: "
              caption2="Team: "
              caption3="Birth: "
              caption4="Biography: "
              text1={driverDetails.Driver.nationality}
              text2={driverDetails.Constructors[0].name}
              text3={driverDetails.Driver.dateOfBirth}
              text4={driverDetails.Driver.url}
              familyName={driverDetails.Driver.familyName}
              cardCountryCode={driverCountryCode}
              driverDetails={driverDetails}
            />
            <table>
              <caption>Driver Details</caption>
              <thead>
                <tr>
                  <th>Round</th>
                  <th>Flag</th>
                  <th>Race Name</th>
                  <th>Constructor</th>
                  <th>Grid</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody>
                {driverResult.length > 0 ? (
                  driverResult.map((result) => {
                    const raceResult = result.Results[0];
                    const countryCode = flagHandler(
                      result.Circuit.Location.country
                    );

                    return (
                      <tr key={result.round}>
                        <td>{result.round}</td>
                        <td>
                          <img
                            src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
                            alt={countryCode}
                          />
                        </td>
                        <td>{result.raceName}</td>
                        <td>{raceResult.Constructor.name}</td>
                        <td>{raceResult.grid}</td>
                        <td>{raceResult.position}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6}>Loading driver details...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default DriverDetails;
