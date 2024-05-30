const Card = (props) => {
  return (
    <div className="card-wrapper">
      <div>
        <div className="card-img"></div>
        <div className="card-title">
          {/* flag */}
          <h3>{props.title}</h3>
        </div>
      </div>
      <div className="card-info">
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
