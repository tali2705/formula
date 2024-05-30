const Card = (props) => {
    return (
        <div className='card-wrapper'>
            <div>
                <div className='card-img'>
                    <img
                        src={require(`../../assets/drivers/${props.familyName}.png`)}
                        alt={props.familyName}
                    />
                </div>
                <div className='card-title'>
                    <img
                        src={`https://flagsapi.com/${props.driverCountryCode}/shiny/64.png`}
                        alt={props.driverCountryCode}
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
