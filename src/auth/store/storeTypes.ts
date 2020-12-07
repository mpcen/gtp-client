import { ESPNLeague, SleeperLeague } from '../../leagues/store/storeTypes';

export type CurrentUser = {
    id: string;
    email: string;
    iat: number | null;
};

export type AuthState = {
    currentUser: CurrentUser;
    token: string;
    error: string;
    isLoading: boolean;
    isResolvingAuth: boolean;
    isPreloadingData: boolean;
    isDataPreloaded: boolean;
    preloadedLeagues: {
        sleeper: SleeperLeague[];
        espn: ESPNLeague[];
    };
    resetPassword: {
        fullUrl: string;
        id: string;
        token: string;
    };
};
