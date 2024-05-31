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
                <div className='card-img'>
                    <img
                        src={require(`../../assets/${srcChunk}/${propsChunk}.png`)}
                        alt={propsChunk}
                    />
                </div>
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
                <p>
                    <span>{props.caption4}</span> {props.text4}
                </p>
            </div>
        </div>
    );
};

export default Card;
