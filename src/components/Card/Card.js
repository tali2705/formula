import axios from "axios";
import { useEffect, useState } from "react";

const Card = (props) => {


    return (
        <div>
            <h3>{props.title}</h3>
            <p>{props.caption1} {props.text1}</p>
            <p>{props.caption2} {props.text2}</p>
            <p>{props.caption3} {props.text3}</p>
            <p>{props.caption4} {props.text4}</p>
        </div>
    )
}
export default Card;