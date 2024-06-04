import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../../Loader';
import Header from '../Header/Header';
import Card from '../Card/Card';

import { fetchData } from '../utils/fetchData';
import flagHandler from '../utils/flagHandler';

import {
    IApiResponse,
    IApiResponseStandings,
    IDriverResult,
    IDriverDetails,
    IDriverRaceResult,
    IDriverStanding,
    IDriver,
    IBreadCrumby,
} from '../Interfaces/GlobalInterface';

const DriverDetails: React.FC = () => {
    const [driverResult, setDriverResult] = useState<IDriverResult[]>([]);
    const [driverDetails, setDriverDetails] = useState<IDriverDetails | null>(
        null
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { driverId } = useParams<{
        driverId: string | undefined;
    }>();

    const getDriverDetails = useCallback(async (): Promise<void> => {
        const url1: string = `http://ergast.com/api/f1/2023/drivers/${driverId}/results.json`;
        const url2: string = `http://ergast.com/api/f1/2023/drivers/${driverId}/driverStandings.json`;

        const [response1, response2]: [IApiResponse, IApiResponseStandings] =
            await Promise.all([
                fetchData<IApiResponse>(url1),
                fetchData<IApiResponseStandings>(url2),
            ]);

        const result: IDriverResult[] = response1.MRData.RaceTable.Races;
        const details: IDriverStanding =
            response2.MRData.StandingsTable.StandingsLists[0]
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

    const crumb: IDriver = driverResult[0]?.Results[0]?.Driver;

    const breadcrumbs: IBreadCrumby[] =
        driverResult.length > 0
            ? [
                  { label: 'F1 - Feeder', route: '/' },
                  { label: 'Drivers', route: '/' },
                  {
                      label: `${crumb.givenName} ${crumb.familyName}`,
                      route: `/driver/${driverId}`,
                  },
              ]
            : [];

    const driverCountryCode: string =
        driverResult.length > 0
            ? flagHandler(driverResult[0].Results[0].Driver.nationality)
            : '';

    return (
        <>
            <div className='header'>
                <Header data={breadcrumbs} />
            </div>

            <div className='wrapper-details'>
                {driverDetails && (
                    <Card
                        title={`${driverDetails.Driver.givenName} ${driverDetails.Driver.familyName}`}
                        caption1='Nationality: '
                        caption2='Team: '
                        caption3='Birth: '
                        caption4='Biography: '
                        text1={driverDetails.Driver.nationality}
                        text2={driverDetails.Constructors[0].name}
                        text3={driverDetails.Driver.dateOfBirth}
                        text4={driverDetails.Driver.url}
                        familyName={driverDetails.Driver.familyName}
                        cardCountryCode={driverCountryCode}
                        driverDetails={true}
                    />
                )}
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
                                const raceResult: IDriverRaceResult =
                                    result.Results[0];
                                const countryCode: string = flagHandler(
                                    result.Circuit.Location.country
                                );

                                return (
                                    <tr key={result.round}>
                                        <td>{result.round}</td>
                                        <td>
                                            <img
                                                className='table-flag'
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
    );
};

export default DriverDetails;
