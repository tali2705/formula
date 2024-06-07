import styled from 'styled-components';

import { primaryColor, bigFontColor } from '../../styles/GeneralStyles';

const CardWrapper = styled.div`
    margin-top: 4em;
    padding: 0.6em;

    .card-content {
        padding: 0.5em;
        margin-left: 0.3em;
        background-color: ${primaryColor};
        border: 0.1em solid ${bigFontColor};
        box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2);

        .card-header {
            display: flex;
            flex-direction: column;

            .card-pic {
                width: 200px;
                margin: 0 auto;
            }

            .card-title {
                display: flex;
                flex-direction: column;
                justify-content: end;
                align-items: start;
                margin-left: 0.6em;

                h3 {
                    font-weight: 600;
                    font-size: 1.1em;
                }
            }
        }

        .card-info {
            margin-top: 0.9em;

            p {
                display: flex;
                margin: 0.6em 0.6em 0.6em 0;
            }

            span {
                font-weight: 600;
                padding-right: 0.5em;
            }
        }
    }
`;

export default CardWrapper;
