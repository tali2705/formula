import styled from 'styled-components';

const primaryColor = '#faf0e6';
const bigFontColor = '#98aeb6';
const secondaryColor = '#333';

const CrumbsWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.25em;

    span {
        font-size: 1.2em;
        margin-left: 1.25em;
    }

    a {
        margin: 0.313em;
        padding: 0.625em 0.9em;
        font-size: 1.2em;
        font-weight: 800;
        text-decoration: none;
        color: ${bigFontColor};

        &:hover {
            background-color: ${secondaryColor};
            color: ${primaryColor};
            border-radius: 3px;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
        }
    }
`;

export default CrumbsWrapper;
