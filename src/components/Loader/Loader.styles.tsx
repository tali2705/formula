import styled, { keyframes } from 'styled-components';

const primaryColor = '#faf0e6';

const spinAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
`;

export const LoaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${primaryColor};
    position: relative;
    top: 40vh;
    margin: 0 auto;
    width: 200px;

    .loader {
        animation: ${spinAnimation} 1s linear infinite;
        margin-bottom: 15px;
    }
`;
