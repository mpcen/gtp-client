import { LeagueActionTypes } from './actionTypes';

// FIND_SLEEPER_USER
type FindUser = {
    type: LeagueActionTypes.FIND_SLEEPER_USER;
};
type FindUser_success = {
    type: LeagueActionTypes.FIND_SLEEPER_USER_SUCCESS;
    payload: {
        username: string;
        displayName: string;
        avatar: string;
    };
};
type FindUser_fail = {
    type: LeagueActionTypes.FIND_SLEEPER_USER_FAIL;
    payload: {
        error: string;
    };
};
type FindUserDispatchTypes = FindUser | FindUser_success | FindUser_fail;

export type LeagueDispatchTypes = FindUserDispatchTypes;
