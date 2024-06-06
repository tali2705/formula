import { ReactNode } from 'react';

export interface IDriver {
    driverId: string;
    nationality: string;
    familyName: string;
    givenName: string;
    dateOfBirth: string;
    url: string;
}

export interface IDriverRow {
    position: string;
    Driver: IDriver;
    Constructors: { name: string; constructorId: string }[];
    points: string;
}

export interface IDriverStanding {
    position: string;
    Driver: IDriver;
    Constructors: { name: string; constructorId: string }[];
    points: string;
}

export interface IStandingsList {
    DriverStandings: IDriverStanding[];
}

export interface IStandingsTable {
    StandingsLists: IStandingsList[];
}

export interface IApiResponseStandings {
    MRData: {
        StandingsTable: IStandingsTable;
    };
}

export interface IConstructor {
    constructorId: string;
    name: string;
    nationality: string;
    url: string;
}

export interface IQualifyingResult {
    position: string;
    Driver: IDriver;
    Constructor: IConstructor;
    Q1: string;
    Q2: string;
    Q3: string;
}

export interface IRaceResult {
    position: string;
    Driver: IDriver;
    Constructor: IConstructor;
    grid: number;
    Time?: {
        time: string;
    };
    status: string;
    points: string;
}

export interface IRace {
    round: number;
    raceName: string;
    date: string;
    url: string;
    Circuit: ICircuit;
    QualifyingResults: IQualifyingResult[];
    Results: IRaceResult[];
}

export interface IRaceRowProps {
    race: IRace;
}

export interface IMRData {
    RaceTable: {
        Races: IRace[];
    };
}

export interface IApiResponse {
    MRData: IMRData;
}

export interface ILocation {
    country: string;
    locality: string;
}

export interface ICircuit {
    Location: ILocation;
    circuitName: string;
}

export interface ICardProps {
    title: string;
    caption1: string;
    text1: string;
    caption2: string;
    text2: string;
    caption3: string;
    text3: string;
    caption4: string;
    text4: string;
    cardCountryCode: string;
    driverDetails?: boolean;
    raceDetails?: boolean;
    teamDetails?: boolean;
    familyName?: string;
    round?: string;
    teamId?: string;
}

export interface IDriverResult {
    Results: {
        Driver: IDriver;
        Constructor: IConstructor;
        grid: number;
        position: string;
    }[];
    Circuit: {
        Location: {
            country: string;
        };
    };
    round: number;
    raceName: string;
}

export interface IDriverDetails {
    Driver: IDriver;
    Constructors: IConstructorName[];
}

export interface IDriverRaceResult {
    Driver: IDriver;
    Constructor: IConstructorName;
    grid: number;
    position: string;
}

export interface IConstructorName {
    name: string;
    constructorId: string;
}

export interface ITeamStanding {
    position: string;
    Constructor: IConstructor;
    points: string;
}

export interface IApiResponseTeamStanding {
    MRData: {
        StandingsTable: {
            StandingsLists: {
                ConstructorStandings: ITeamStanding[];
            }[];
        };
    };
}

export interface ITeam {
    position: string;
    Constructor: IConstructor;
    points: string;
}

export interface ITeamRow {
    team: ITeam;
}

export interface ITeamRaceResult {
    position: string;
    Driver: {
        familyName: string;
    };
    points: string;
}

export interface ITeamRace {
    round: number;
    raceName: string;
    Circuit: {
        Location: {
            country: string;
        };
    };
    Results: ITeamRaceResult[];
}

export interface IApiResponseTeamResults {
    MRData: {
        RaceTable: {
            Races: ITeamRace[];
        };
    };
}

export interface IApiResponseTeamStandings {
    MRData: {
        StandingsTable: {
            StandingsLists: {
                ConstructorStandings: ITeamStanding[];
            }[];
        };
    };
}

export interface ITeamStanding {
    position: string;
    Constructor: {
        constructorId: string;
        name: string;
        nationality: string;
        url: string;
    };
    points: string;
}

export interface INavLinkItem {
    label: string;
    to: string;
}

export interface IScrollToTopProps {
    children: ReactNode;
}

export interface ISearchProps {
    className: string;
    onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ICrumb {
    route: string;
    label: string;
}

export interface IBreadcrumbsProps {
    data: ICrumb[];
}
