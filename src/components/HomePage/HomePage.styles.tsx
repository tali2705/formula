import styled from 'styled-components';

const secondaryColor = '#333';
const bigFont = '"Racing Sans One", "sans-serif"';
const linkBorderColor = '#9dc3d1';

const HomepageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin: 7em auto 0 auto;

    .homepage-logo {
        display: flex;

        img {
            width: 31.25em;
        }
    }

    .homepage-links {
        display: flex;
        justify-content: space-around;
        padding: 2.5em;
        font-weight: 900;
        font-size: 1.5em;

        a {
            text-decoration: none;
            color: ${secondaryColor};
            padding: 0.9em 2.2em;
            border-left: 0.12em solid ${linkBorderColor};
            font-family: ${bigFont};

            &:hover {
                background-color: ${linkBorderColor};
                box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.35);
                border-radius: 3px;
            }

            &:first-child {
                border: none;
            }
        }
    }
`;

export default HomepageWrapper;
