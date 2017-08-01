import * as CONSTANTS from './constants';
import {Map} from 'immutable'

export type SetStateAction = {
    type: CONSTANTS.SET_STATE,
    state: Map<any, any>
}

export type VoteAction = {
    type: CONSTANTS.VOTE,
    entry: string
}

export type NextAction = {
    type: CONSTANTS.NEXT
}

export type OtherAction = {
    type: '';
}

export const OtherAction: OtherAction = { type: '' }