import { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';

import Loader from '../../Loader';
import Card from '../Card/Card';
import Breadcrumbs from '../Header/Breadcrumbs';
import SideBar from '../SideBar/SideBar';

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
    ICrumb,
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
        const driverResultURL: string = `http://ergast.com/api/f1/2023/drivers/${driverId}/results.json`;
        const driverDetailsURL: string = `http://ergast.com/api/f1/2023/drivers/${driverId}/driverStandings.json`;

        const [driverResultsResponse, driverDetailsResponse]: [
            IApiResponse,
            IApiResponseStandings
        ] = await Promise.all([
            fetchData<IApiResponse>(driverResultURL),
            fetchData<IApiResponseStandings>(driverDetailsURL),
        ]);

        const result: IDriverResult[] =
            driverResultsResponse.MRData.RaceTable.Races;
        const details: IDriverStanding =
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

    const crumb: IDriver = driverResult[0]?.Results[0]?.Driver;

    const breadcrumbs: ICrumb[] = [
        { label: 'F1 - Feeder', route: '/' },
        { label: 'Drivers', route: '/drivers' },
        {
            label: `${crumb.givenName} ${crumb.familyName}`,
            route: `/driver/${driverId}`,
        },
    ];

    const driverCountryCode: string =
        driverResult.length > 0
            ? flagHandler(driverResult[0].Results[0].Driver.nationality)
            : '';

    return (
        <div className='content-wrapper'>
            <SideBar />
            <div className='content-wrapper-right'>
                <div className='header'>
                    <Breadcrumbs data={breadcrumbs} />
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
                                <th>Race Name</th>
                                <th>Constructor</th>
                                <th>Grid</th>
                                <th>Position</th>
                            </tr>
                        </thead>
                        <tbody>
                            {driverResult.map((result) => {
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
                                            <Link to={`/races/${result.round}`}>
                                                {result.raceName}
                                            </Link>
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
