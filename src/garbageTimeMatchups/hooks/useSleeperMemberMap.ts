import { useState, useEffect } from 'react';

import {
    SleeperLeagueMember,
    SleeperLeague,
} from '../../leagues/store/storeTypes';

export type MemberMap = {
    [key: string]: SleeperLeagueMember;
};

const createMemberMap = (members: SleeperLeagueMember[]): MemberMap => {
    const map = {} as MemberMap;

    members.forEach((member) => {
        map[member.memberId] = member;
    });

    return map;
};

export const useSleeperMemberMap = (selectedLeague: SleeperLeague) => {
    const [memberMap, setMemberMap] = useState({} as MemberMap);

    useEffect(() => {
        if (selectedLeague?.leagueId) {
            const map = createMemberMap(selectedLeague.members);

            setMemberMap(map);
        }
    }, [selectedLeague?.leagueId]);

    return { memberMap };
};
