import styled from 'styled-components';

export const primaryColor = '#faf0e6';
export const bigFontColor = '#98aeb6';
export const secondaryColor = '#333';
export const bigFont = '"Racing Sans One", "sans-serif"';
export const primaryFont = '"Roboto", "sans-serif"';

export const WrapperDetails = styled.div`
    margin: 1.25em auto;
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 1.8em;
`;

export const MainContent = styled.div`
    margin: 1.25em auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 1.9em;
`;

export const Header = styled.header`
    min-width: 100%;
    min-height: 6.188em;
    color: ${bigFontColor};
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.06em solid ${bigFontColor};
`;

export const ContentWrapperRight = styled.div`
    min-width: 85%;
    display: flex;
    align-items: center;
    flex-direction: column;

    .title {
        margin-top: 0.5em;
        font-family: ${bigFont};
        text-align: center;
        font-size: 2.5em;
        color: ${secondaryColor};
    }

    table {
        width: 85%;
        margin: 1.25em auto;

        caption {
            color: ${bigFontColor};
            font-size: 1.5em;
            font-weight: 600;
            font-style: italic;
            padding: 0.625em;
            text-align: left;
        }

        td {
            padding: 0.5rem 0.323em;
            font-size: 1em;
            text-align: left;
            border-right: 0.06em solid ${bigFontColor};
            vertical-align: middle;

            a {
                text-decoration: none;
                color: ${secondaryColor};
                cursor: pointer;
            }

            span {
                display: flex;
                align-items: center;
                width: fit-content;
                cursor: pointer;
            }

            .table-flag {
                width: 2em;
                height: 2em;
                padding-right: 0.5em;
            }

            .icon {
                padding-left: 0.5em;
                width: 0.9em;
            }
        }

        th {
            background-color: #9dc3d1;
            border-right: 0.06em solid ${bigFontColor};
            font-size: 1em;
            font-weight: 600;
            padding: 0.9em;
            text-align: left;
        }
    }
`;

export const ContentWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Wrapper = styled.div`
    overflow: hidden;
    box-sizing: border-box;
    min-height: 100vh;
    background-color: ${primaryColor};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: ${primaryFont};
`;
export const TableDetails = styled.div`
table {
width: 100%;
}`;
