import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className='loader-container'>
            <img
                src={require('./assets/Kaciga.png')}
                alt='Loading...'
                className='loader'
            />
            <p>Loading...</p>
        </div>
    );
};

export default Loader;
