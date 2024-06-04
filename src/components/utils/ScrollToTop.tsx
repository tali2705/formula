import React, { useLayoutEffect } from 'react';
import { useLocation } from 'react-router';

import { IScrollToTopProps } from '../Interfaces/GlobalInterface';

const ScrollToTop: React.FC<IScrollToTopProps> = ({ children }) => {
    const location = useLocation();

    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);

    return <>{children}</>;
};

export default ScrollToTop;
