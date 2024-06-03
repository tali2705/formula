import { Link } from 'react-router-dom';

const Card = (props) => {
    let srcChunk = '';
    let propsChunk = '';

    props.driverDetails &&
        (srcChunk = 'drivers') &&
        (propsChunk = `${props.familyName}`);

    props.raceDetails &&
        (srcChunk = 'races') &&
        (propsChunk = `${props.round}`);

    props.teamDetails &&
        (srcChunk = 'teams') &&
        (propsChunk = `${props.teamId}`);

    return (
        <div className='card-wrapper'>
            <div>
                <img
                    src={require(`../../assets/${srcChunk}/${propsChunk}.png`)}
                    alt={propsChunk}
                    className='card-pic'
                />
                <div className='card-title'>
                    <img
                        src={`https://flagsapi.com/${props.cardCountryCode}/shiny/64.png`}
                        alt={props.cardCountryCode}
                    />
                    <h3>{props.title}</h3>
                </div>
            </div>
            <div className='card-info'>
                <p>
                    <span>{props.caption1}</span> {props.text1}
                </p>
                <p>
                    <span>{props.caption2}</span> {props.text2}
                </p>
                <p>
                    <span>{props.caption3}</span> {props.text3}
                </p>
                <p style={{ display: 'flex' }}>
                    <span>{props.caption4}</span>&nbsp;
                    <div className='icon' style={{ width: '15px' }}>
                        <Link to={props.text4} target='_blank'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 512 512'
                            >
                                <path d='M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32c0-17.7-14.3-32-32-32H352zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z' />
                            </svg>
                        </Link>
                    </div>
                </p>
            </div>
        </div>
    );
};

export default Card;
