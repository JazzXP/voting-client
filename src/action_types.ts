import * as CONSTANTS from './constants';
import {Map} from 'immutable'
import {VotingClientState} from './action_creators';

export type SetStateAction = {
    type?: CONSTANTS.SET_STATE,
    state: VotingClientState
}

export type VoteAction = {
    type?: CONSTANTS.VOTE,
    entry: string
}

export type NextAction = {
    type?: CONSTANTS.NEXT
}

export type OtherAction = {
    type?: '';
}

export const OtherAction: OtherAction = { type: '' }