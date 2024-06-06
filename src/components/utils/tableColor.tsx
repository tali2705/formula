const pointsColorMap: { [key: string]: string } = {
    '26': '#458fcc',
    '25': '#458fcc',
    '19': '#6cabdf',
    '18': '#6cabdf',
    '15': '#91c0e7',
    '13': '#b5d5ef',
    '12': '#b5d5ef',
    '10': '#daeaf7',
};

const positionColorMap: { [key: string]: string } = {
    '1': '#4896d7',
    '2': '#6cabdf',
    '3': '#91c0e7',
    '4': '#b5d5ef',
    '5': '#daeaf7',
};

const tableColor = (points: string, position: string): string => {
    if (pointsColorMap[points]) {
        return pointsColorMap[points];
    }
    if (positionColorMap[position]) {
        return positionColorMap[position];
    }
    return '#e9e9e9';
};

export default tableColor;
