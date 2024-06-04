import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";

import Loader from "../../Loader";
import Card from "../Card/Card";
import Breadcrumbs from "../Header/Breadcrumbs";
import SideBar from "../SideBar/SideBar";

import { fetchData } from "../utils/fetchData";
import flagHandler from "../utils/flagHandler";

const RaceDetails = () => {
  const [qualifyingResults, setQualifyingResults] = useState([]);
  const [raceDetails, setRaceDetails] = useState({});
  const [raceResult, setRaceResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { round } = useParams();

  const getBestTime = (result) => {
    const times = [result.Q1, result.Q2, result.Q3].filter(Boolean);

    return times.sort()[0];
  };

  const getRaceDetails = useCallback(async () => {
    const qualifyingResultsURL = `http://ergast.com/api/f1/2023/${round}/qualifying.json`;
    const raceResultsURL = `http://ergast.com/api/f1/2023/${round}/results.json`;

    const [qualifyingResultsResponse, raceResultsResponse] = await Promise.all([
      fetchData(qualifyingResultsURL),
      fetchData(raceResultsURL),
    ]);

    const qResults =
      qualifyingResultsResponse.MRData.RaceTable.Races[0].QualifyingResults;
    const aboutRace = qualifyingResultsResponse.MRData.RaceTable.Races[0];
    const rResults = raceResultsResponse.MRData.RaceTable.Races[0].Results;

    setQualifyingResults(qResults);
    setRaceDetails(aboutRace);
    setRaceResult(rResults);
    setIsLoading(false);
  }, [round]);

  useEffect(() => {
    getRaceDetails();
  }, [getRaceDetails]);

  if (isLoading) {
    return <Loader />;
  }
  const crumb = raceDetails.raceName;
  const breadcrumbs = [
    { label: "F1 - Feeder", route: "/" },
    { label: "Races", route: "/races" },
    { label: `${crumb}`, route: `/races/${round}` },
  ];

  const raceCountryCode = raceDetails.Circuit
    ? flagHandler(raceDetails.Circuit.Location.country)
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
            title={raceDetails.raceName}
            caption1={`Country: `}
            caption2={`Location: `}
            caption3={`Date: `}
            caption4={`Full report: `}
            text1={raceDetails.Circuit.Location.country}
            text2={raceDetails.Circuit.Location.locality}
            text3={raceDetails.date}
            text4={raceDetails.url}
            round={raceDetails.round}
            cardCountryCode={raceCountryCode}
            raceDetails={true}
          />
          <table>
            <caption>Qualifying Results</caption>
            <thead>
              <tr>
                <th>Pos</th>
                <th>Driver</th>
                <th>Team</th>
                <th>Best Time</th>
              </tr>
            </thead>
            <tbody>
              {qualifyingResults.map((qualifyRes) => {
                const countryCode = flagHandler(qualifyRes.Driver.nationality);
                const bestTime = getBestTime(qualifyRes);

                return (
                  <tr key={qualifyRes.position}>
                    <td>{qualifyRes.position}</td>
                    <td>
                      <img
                        src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
                        alt={countryCode}
                        className="table-flag"
                      />
                      <Link to={`/drivers/${qualifyRes.Driver.driverId}`}>
                        {qualifyRes.Driver.familyName}
                      </Link>
                    </td>
                    <td>{qualifyRes.Constructor.name}</td>
                    <td>{bestTime}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <table>
            <caption>Race Results</caption>
            <thead>
              <tr>
                <th>Pos</th>
                <th>Driver</th>
                <th>Team</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {raceResult.map((raceRes) => {
                const countryCode = flagHandler(raceRes.Driver.nationality);

                return (
                  <tr key={raceRes.position}>
                    <td>{raceRes.position}</td>
                    <td>
                      <img
                        src={`https://flagsapi.com/${countryCode}/shiny/64.png`}
                        alt={countryCode}
                        className="table-flag"
                      />
                      <Link to={`/drivers/${raceRes.Driver.driverId}`}>
                        {raceRes.Driver.familyName}
                      </Link>
                    </td>
                    <td>{raceRes.Constructor.name}</td>
                    <td>{raceRes.Time ? raceRes.Time.time : raceRes.status}</td>
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

export default RaceDetails;
