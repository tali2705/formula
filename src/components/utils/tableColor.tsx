const pointsColorMap: { [key: string]: string } = {
    '26': '#b04888',
    '25': '#b04888',
    '19': '#b04888',
    '18': '#bf6c9f',
    '15': '#cf91b7',
    '12': '#dfb5cf',
    '10': '#efdae7',
};

const positionColorMap: { [key: string]: string } = {
    '1': '#b04888',
    '2': '#bf6c9f',
    '3': '#cf91b7',
    '4': '#dfb5cf',
    '5': '#efdae7',
};

const tableColor = (points: string, position: string): string => {
    if (pointsColorMap[points]) {
        return pointsColorMap[points];
    }
    if (positionColorMap[position]) {
        return positionColorMap[position];
    }
    return '#efdaff';
};

export default tableColor;
