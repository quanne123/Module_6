import React, { useEffect } from 'react';
import { ACCESS_TOKEN } from '../../constants';
import { useHistory, useLocation, Redirect } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
    const history = useHistory();
    const location = useLocation();

    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    useEffect(() => {
        const token = getUrlParameter('token');
        const error = getUrlParameter('error');

        if (token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            history.push({
                pathname: '/profile',
                state: { from: location },
            });
        } else {
            history.push({
                pathname: '/login',
                state: {
                    from: location,
                    error: error,
                },
            });
        }
    }, [history, location]);

    return <Redirect to="/" />;
};

export default OAuth2RedirectHandler;
