import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';
import * as actionTypes from '../src/action_types';
import {SET_STATE, VOTE} from '../src/constants';
import {VotingClientState} from '../src/action_creators';

describe('reducer', () => {
    it('handles SET_STATE', () => {
        const initialState = new VotingClientState();
        const action: actionTypes.SetStateAction = {
            type: SET_STATE,
            state: Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({'Trainspotting': 1})
                })
            })
        };
        const nextState = reducer(initialState, action);

        expect(nextState.toJS()).to.deep.equal({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: { 'Trainspotting': 1 }
            }
        });
    });

    it('handles SET_STATE with plain JS payload', () => {
        const initialState = new VotingClientState();
        const action: any = {
            type: "SET_STATE",
            state: {
                vote: {
                    pair: ['Trainspotting', '28 Days Later'],
                    tally: {'Trainspotting': 1}
                }
            }
        };
        const nextState = reducer(initialState, action);

        expect(nextState.toJS()).to.deep.equal({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: { 'Trainspotting': 1 }
            }
        });
    });

    it('handles SET_STATE without initial state', () => {
        const action: any = {
            type: SET_STATE,
            state: {
                vote: {
                    pair: ['Trainspotting', '28 Days Later'],
                    tally: {'Trainspotting': 1}
                }
            }
        };
        const nextState = reducer(undefined, action);

        expect(nextState.toJS()).to.deep.equal({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: { 'Trainspotting': 1 }
            }
        });
    });

    it('handles VOTE by setting has Voted', () => {
        const state: any = {
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {'Trainspotting': 1}
            }
        };
        const action: any = {
            type: VOTE, 
            entry: 'Trainspotting'
        };
        const nextState = reducer(state, action);

        expect(nextState.toJS()).to.deep.equal({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: { 'Trainspotting': 1 }
            },
            hasVoted: 'Trainspotting'
        });
    });

    it('does not set hasVoted for VOTE on invalid entry', () => {
        const state: any = {
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {'Trainspotting': 1}
            }
        };
        const action = {type: VOTE, entry: 'Sunshine'};
        const nextState = reducer(state, action);
        expect(nextState.toJS()).to.deep.equal({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: { 'Trainspotting': 1 }
            }
        });
    });

    it('removes hasVoted on SET_STATE if pair changes', () => {
        const initialState: any = {
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {'Trainspotting': 1}
            },
            hasVoted: 'Trainspotting'
        };
        const action: any = {
            type: SET_STATE,
            state: {
                vote: {
                    pair: ['Sunshine', 'Slumdog Millionare']
                }
            }
        };
        const nextState = reducer(initialState, action);

        expect(nextState.toJS()).to.deep.equal({
            vote: {
                pair: ['Sunshine', 'Slumdog Millionare']
            }
        });
    });
});