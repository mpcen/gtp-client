import { useState, useEffect } from 'react';

import {
    ESPNLeagueMember,
    ESPNLeague,
} from '../../../leagues/store/storeTypes';

export type ESPNMemberMap = {
    [key: string]: ESPNLeagueMember;
};

const createMemberMap = (members: ESPNLeagueMember[]): ESPNMemberMap => {
    const map = {} as ESPNMemberMap;

    members.forEach((member) => {
        map[member.id] = member;
    });

    return map;
};

export const useESPNMemberMap = (league: ESPNLeague) => {
    const [memberMap, setMemberMap] = useState({} as ESPNMemberMap);

    useEffect(() => {
        if (league?.leagueId) {
            const map = createMemberMap(league.members);

            setMemberMap(map);
        }
    }, [league?.leagueId]);

    return { espnMemberMap: memberMap };
};
