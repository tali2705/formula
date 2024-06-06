import React from 'react';
import { NavLink } from 'react-router-dom';

import SidebarWrapper from './SideBar.styles';

const SideBar: React.FC = () => {
    return (
        <SidebarWrapper>
            <NavLink to='/'>
                <img
                    className='logo'
                    src={require('../../assets/FI-logo_rendered.png')}
                    alt='logo'
                />
            </NavLink>
            <nav className='side-nav'>
                <NavLink
                    to='/drivers'
                    className={({
                        isActive,
                        isPending,
                    }: {
                        isActive: boolean;
                        isPending: boolean;
                    }) => (isPending ? 'pending' : isActive ? 'active' : '')}
                >
                    Drivers
                </NavLink>
                <NavLink
                    to='/teams'
                    className={({
                        isActive,
                        isPending,
                    }: {
                        isActive: boolean;
                        isPending: boolean;
                    }) => (isPending ? 'pending' : isActive ? 'active' : '')}
                >
                    Teams
                </NavLink>
                <NavLink
                    to='/races'
                    className={({
                        isActive,
                        isPending,
                    }: {
                        isActive: boolean;
                        isPending: boolean;
                    }) => (isPending ? 'pending' : isActive ? 'active' : '')}
                >
                    Races
                </NavLink>
            </nav>
        </SidebarWrapper>
    );
};

export default SideBar;
