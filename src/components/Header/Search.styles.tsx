import styled from 'styled-components';

import { bigFontColor } from '../../styles/GeneralStyles';

const SearchBoxWrapper = styled.div`
    border: 0.063em solid ${bigFontColor};
    padding: 0.5em 0.6em;
    background-color: #fff;
    margin-right: 1.8em;
    display: flex;
    align-items: center;

    input {
        margin-left: 0.3em;
        background-color: #fff;
        border: none;
        outline: none;
        font-size: 0.9em;
    }
`;

export default SearchBoxWrapper;
