import styled from 'styled-components';

const primaryColor = '#faf0e6';
const bigFontColor = '#98aeb6';
const secondaryColor = '#333';
const bigFont = '"Racing Sans One", "sans-serif"';

const SidebarWrapper = styled.div`
    min-width: 15%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    img {
        margin: 10px auto 0 auto;
        width: 90%;
        height: 4.6em;
    }

    .side-nav {
        display: flex;
        flex-direction: column;
        text-align: center;
        font-family: ${bigFont};
        margin-top: 0.9em;

        a {
            font-family: ${bigFont};
            width: fit-content;
            padding: 1.2em 0;
            color: ${bigFontColor};
            text-align: center;
            text-decoration: none;
            font-size: 1.4em;
            width: 100%;
            border-bottom: 0.06em solid ${bigFontColor};

            &:hover {
                background-color: ${secondaryColor};
                color: ${primaryColor};
                box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
                border-radius: 0 3px 3px 0;
            }
        }

        .active {
            color: ${secondaryColor};
        }
    }
`;

export default SidebarWrapper;
