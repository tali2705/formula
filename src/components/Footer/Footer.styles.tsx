import styled from 'styled-components';

import {
    bigFontColor,
    footerBackgroundColor,
} from '../../styles/GeneralStyles';

const FooterWrapper = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.6em 0;
    border-top: 1px solid ${bigFontColor};
    text-align: center;
    background-color: ${footerBackgroundColor};
    box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.3);

    .footer-icons {
        padding: 0 0.55em;
        width: 1.2em;
    }

    sub,
    sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
    }

    sup {
        top: -0.5em;
    }

    sub {
        bottom: -0.25em;
    }
`;

export default FooterWrapper;
