import { NavLink } from 'react-router-dom';

import HomepageWrapper from './HomePage.styles';

const Home: React.FC = () => {
    return (
        <HomepageWrapper>
            <div className='homepage-logo'>
                <img
                    src={require('../../assets/homepage-logo.png')}
                    alt='Homepage logo'
                />
            </div>

            <div className='homepage-links'>
                <NavLink className='link' to='/drivers'>
                    Drivers
                </NavLink>

                <NavLink className='link' to='/teams'>
                    Teams
                </NavLink>

                <NavLink className='link' to='/races'>
                    Races
                </NavLink>
            </div>
        </HomepageWrapper>
    );
};

export default Home;
