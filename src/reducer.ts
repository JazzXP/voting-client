import {Record, List, fromJS} from 'immutable';
import {AnyAction} from 'redux';
import {SetStateAction, VoteAction, NextAction, OtherAction} from './action_types';
import {SET_STATE, VOTE, NEXT } from './constants';
import {VotingClientState} from './action_creators';

type AllActions = 
    SetStateAction |
    VoteAction |
    NextAction |
    OtherAction;

function setState(state: VotingClientState, newState: VotingClientState): VotingClientState {
    return state.merge(newState);
}

function vote(state: VotingClientState, entry: string): VotingClientState {
    const currentPair = state.getIn(['vote', 'pair']);
    if (currentPair && currentPair.includes(entry)) {
        return state.set('hasVoted', entry);
    } else {
        return state;
    }
}

function resetVote(state: VotingClientState): VotingClientState {
    const hasVoted = state.get('hasVoted');
    const currentPair = state.getIn(['vote', 'pair'], List());
    if (hasVoted && !currentPair.includes(hasVoted)) {
        return state.remove('hasVoted');
    } else {
        return state;
    }
}

export default function(state: VotingClientState = new VotingClientState(), action: AllActions = OtherAction): VotingClientState {
    let newState: VotingClientState = fromJS(state);
    switch (action.type) {
        case SET_STATE:
            return resetVote(setState(newState, action.state));
        case VOTE:
            return vote(newState, action.entry);
    }
    return newState;
}