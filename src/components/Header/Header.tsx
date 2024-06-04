import React from 'react';
import { Link } from 'react-router-dom';

import { IHeaderProps } from '../Interfaces/GlobalInterface';

const Header: React.FC<IHeaderProps> = (props) => {
    return (
        <div className='header'>
            <ul className='breadcrumb'>
                {props.data?.map((crumb, k) => (
                    <li className='crumb' key={k}>
                        {k < props.data.length - 1 ? (
                            <Link to={crumb.route}>{crumb.label}</Link>
                        ) : (
                            <span className='active-crumb'>{crumb.label}</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Header;
