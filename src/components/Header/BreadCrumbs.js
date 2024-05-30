import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = (props) => {
    return (
        <ul>
            {props.data?.map((crumb, k) => {
                return (
                    <li key={k}>
                        {k < props.data.length - 1 ? (
                            <Link to={crumb.route}>{crumb.label}</Link>
                        ) : (
                            <span> {crumb.label} </span>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default Breadcrumbs;
