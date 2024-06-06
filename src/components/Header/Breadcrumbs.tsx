import React from 'react';
import { Link } from 'react-router-dom';

import { IBreadcrumbsProps } from '../Interfaces/GlobalInterface';

import CrumbsWrapper from './Breadcrumbs.styles';

const Breadcrumbs: React.FC<IBreadcrumbsProps> = (props) => {
    return (
        <CrumbsWrapper>
            {props.data?.map((crumb, k) => {
                return (
                    <div className='crumb' key={k}>
                        {k < props.data.length - 1 ? (
                            <Link className='crumb' to={crumb.route}>
                                {crumb.label}
                            </Link>
                        ) : (
                            <span className='active-crumb'>{crumb.label}</span>
                        )}
                    </div>
                );
            })}
        </CrumbsWrapper>
    );
};

export default Breadcrumbs;
