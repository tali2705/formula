const countryMap = {
    American: 'US',
    Australia: 'AU',
    Australian: 'AU',
    Austrian: 'AT',
    Austria: 'AT',
    Azerbaijan: 'AZ',
    Bahrain: 'BH',
    Belgian: 'BE',
    Belgium: 'BE',
    Brazil: 'BR',
    Brazilian: 'BR',
    British: 'GB',
    Canadian: 'CA',
    Canada: 'CA',
    Chinese: 'CN',
    China: 'CN',
    Danish: 'DK',
    Dutch: 'NL',
    Finnish: 'FI',
    French: 'FR',
    German: 'DE',
    Germany: 'DE',
    Hungary: 'HU',
    India: 'IN',
    Indian: 'IN',
    Italian: 'IT',
    Italy: 'IT',
    Japanese: 'JP',
    Japan: 'JP',
    Korea: 'KR',
    Malaysia: 'MY',
    Malaysian: 'MY',
    Mexican: 'MX',
    Mexico: 'MX',
    Monaco: 'MC',
    Monegasque: 'MC',
    Netherlands: 'NL',
    NewZealander: 'NZ',
    Russian: 'RU',
    Qatar: 'QA',
    SaudiArabia: 'SA',
    Singapore: 'SG',
    Spain: 'ES',
    Spanish: 'ES',
    Swiss: 'CH',
    Thai: 'TH',
    UAE: 'AE',
    UK: 'GB',
    UnitedStates: 'US',
    USA: 'US',
    Venezuelan: 'VE',
};

const flagHandler = (country) => {
    const formattedCountry = country.replace(/\s+/g, '');

    return countryMap[formattedCountry] || 'UN';
};

export default flagHandler;
