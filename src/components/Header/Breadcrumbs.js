import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = (props) => {
  return (
    <ul className="breadcrumb">
      {props.data?.map((crumb, k) => {
        return (
          <li className="crumb" key={k}>
            {k < props.data.length - 1 ? (
              <Link to={crumb.route}>{crumb.label}</Link>
            ) : (
              <span className="active-crumb"> {crumb.label} </span>
            )}
          </li>
        );
      })}
    </ul>
  );
};
export default Breadcrumbs;
