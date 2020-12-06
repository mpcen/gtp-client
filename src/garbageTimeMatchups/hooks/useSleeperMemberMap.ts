import { useState, useEffect } from 'react';

import {
    SleeperLeagueMember,
    SleeperLeague,
} from '../../leagues/store/storeTypes';

export type SleeperMemberMap = {
    [key: string]: SleeperLeagueMember;
};

const createMemberMap = (members: SleeperLeagueMember[]): SleeperMemberMap => {
    const map = {} as SleeperMemberMap;

    members.forEach((member) => {
        map[member.memberId] = member;
    });

    return map;
};

export const useSleeperMemberMap = (selectedLeague: SleeperLeague) => {
    const [memberMap, setMemberMap] = useState({} as SleeperMemberMap);

    useEffect(() => {
        if (selectedLeague?.leagueId) {
            const map = createMemberMap(selectedLeague.members);

            setMemberMap(map);
        }
    }, [selectedLeague?.leagueId]);

    return { sleeperMemberMap: memberMap };
};
