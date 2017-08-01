import {SET_STATE, VOTE, NEXT} from './constants';
import {Record, List, Map} from 'immutable';

export function setStateAction(state: VOTING_CLIENT_STATE): VOTING_CLIENT_STATE {
    return {
        type: SET_STATE,
        state
    };
}

export function voteAction(entry: string): VOTING_CLIENT_STATE {
    return {
        meta: {remote: true},
        type: VOTE,
        entry
    }
}

export function nextAction(): VOTING_CLIENT_STATE {
    return {
        meta: {remote: true},
        type: NEXT
    };
}

export type VOTING_CLIENT_STATE = {
    type?: SET_STATE | VOTE | NEXT | '';
    meta?: {
        remote?: boolean
    };    
    entry?: string;
    state?: VOTING_CLIENT_STATE | {};
    entries?: List<string>;
    vote?: {
        pair?: List<string>;
        tally?: Map<string, number>;
    }
    hasVoted?: string;
    voteAction?: Function;
    setStateAction?: Function;
    nextAction?: Function;
}

export class VotingClientState extends Record({type: undefined, meta: undefined, entry: undefined, state: undefined, entries: undefined, vote: undefined, hasVoted: undefined, voteAction: voteAction, setStateAction: setStateAction, nextAction: nextAction} as VOTING_CLIENT_STATE) {}