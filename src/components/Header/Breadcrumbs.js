import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = (props) => {
  return (
    <div className="crumbs">
      {props.data?.map((crumb, k) => {
        return (
          <div className="crumb">
            {k < props.data.length - 1 ? (
              <Link className="crumb" to={crumb.route}>
                {crumb.label}
              </Link>
            ) : (
              <span className="active-crumb"> {crumb.label} </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default Breadcrumbs;
