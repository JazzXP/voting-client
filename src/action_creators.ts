import {SET_STATE, VOTE, NEXT} from './constants';
import {Record, List, Map} from 'immutable';

export type VOTING_CLIENT_STATE = {
    meta?: {
        remote?: boolean
    };    
    entry?: string;
    state?: VOTING_CLIENT_STATE | {};
    entries?: List<string> | {};
    vote?: {
        pair?: List<string>;
        tally?: Map<string, number>;
    }
    hasVoted?: string;
}

type _VOTING_CLIENT_ACTION = {
    type: SET_STATE | VOTE | NEXT | '';
}

export type VOTING_CLIENT_ACTION = _VOTING_CLIENT_ACTION & VOTING_CLIENT_STATE;

export class VotingClientState extends Record(
    {
    } as VOTING_CLIENT_STATE) {}

export function setStateAction(state: VotingClientState): VOTING_CLIENT_ACTION {
    return {
        type: SET_STATE,
        state
    };
}

export function voteAction(entry: string): VOTING_CLIENT_ACTION {
    return {
        meta: {remote: true},
        type: VOTE,
        entry
    }
}

export function nextAction(): VOTING_CLIENT_ACTION {
    return {
        meta: {remote: true},
        type: NEXT
    };
}

export const actionCreators = {
    setStateAction,
    voteAction,
    nextAction
}