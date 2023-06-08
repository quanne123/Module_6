import { useLocation } from 'react-router-dom';

export function useIsActive(path) {
    const location = useLocation();
    return location.pathname === path;
}