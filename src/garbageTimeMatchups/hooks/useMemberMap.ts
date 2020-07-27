import { useState, useEffect } from 'react';

import { SleeperLeagueMember } from '../../leagues/store/storeTypes';

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

export const useMemberMap = (
    selectedLeagueId: string,
    members: SleeperLeagueMember[]
) => {
    const [memberMap, setMemberMap] = useState({} as MemberMap);

    useEffect(() => {
        if (members) {
            const map = createMemberMap(members);

            setMemberMap(map);
        }
    }, [selectedLeagueId]);

    return { memberMap };
};
