const nationalityMap = {
    British: 'GB',
    French: 'FR',
    German: 'DE',
    Italian: 'IT',
    Belgian: 'BE',
    Austrian: 'AT',
    Dutch: 'NL',
    Mexican: 'MX',
    Spanish: 'ES',
    Monegasque: 'MC',
    Australian: 'AU',
    Canadian: 'CA',
    Thai: 'TH',
    Japanese: 'JP',
    Finnish: 'FI',
    Swiss: 'CH',
    American: 'US',
    Chinese: 'CN',
    Danish: 'DK',
    NewZealander: 'NZ',
};

const flagHandler = (nationality) => {
    const formattedNationality = nationality.replace(/\s+/g, '');

    return nationalityMap[formattedNationality] || 'UN';
};

export default flagHandler;
