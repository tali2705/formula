const countryMap = {
    American: 'US',
    Australia: 'AU',
    Australian: 'AU',
    Austrian: 'AT',
    Bahrain: 'BH',
    Belgian: 'BE',
    Belgium: 'BE',
    Brazil: 'BR',
    British: 'GB',
    Canadian: 'CA',
    Canada: 'CA',
    China: 'CN',
    Chinese: 'CN',
    Danish: 'DK',
    Dutch: 'NL',
    Finnish: 'FI',
    French: 'FR',
    German: 'DE',
    Germany: 'DE',
    Hungary: 'HU',
    India: 'IN',
    Italian: 'IT',
    Italy: 'IT',
    Japanese: 'JP',
    Japan: 'JP',
    Korea: 'KR',
    Malaysia: 'MY',
    Mexican: 'MX',
    Monaco: 'MC',
    Monegasque: 'MC',
    NewZealander: 'NZ',
    Singapore: 'SG',
    Spain: 'ES',
    Spanish: 'ES',
    Swiss: 'CH',
    Thai: 'TH',
    UAE: 'AE',
    UK: 'GB',
    USA: 'US',
};

const flagHandler = (country) => {
    const formattedCountry = country.replace(/\s+/g, '');

    return countryMap[formattedCountry] || 'UN';
};

export default flagHandler;
