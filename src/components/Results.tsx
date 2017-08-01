import * as React from 'react';
import * as Redux from 'redux';
import {connect} from 'react-redux';
import Winner from './Winner';
import {WinnerProps, WinnerState} from './Winner';
import {Map, List} from 'immutable';

import * as actionCreators from '../action_creators';

export interface ResultsProps /*extends WinnerProps*/ {
    pair: List<string>;
    tally: Map<string, number>;
    winner?: string;
    children?: any;
};

export interface ResultsState {}

export interface ResultsConnectedDispatch {
    nextAction?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
}

const defaultArr:Array<string> = [];
export class Results extends React.PureComponent<ResultsProps & ResultsConnectedDispatch, ResultsState> {
    getPair() {
        return this.props.pair || defaultArr;
    }

    getVotes(entry: string) {
        if (this.props.tally && this.props.tally.has(entry)) {
            return this.props.tally.get(entry);
        }
        return 0;
    }

    render() {
        return this.props.winner ?
        <Winner ref="winner" winner={this.props.winner} />:
        <div className="results">
            <div className="tally">
            {this.getPair().map(entry => 
                <div key={entry} className="entry">
                    <h1>{entry}</h1>
                    <div className="voteCount">
                        {this.getVotes(entry!)}
                    </div>
                </div>
            )}
            </div>
            <div className="management">
                <button ref="next"
                    className="next"
                    onClick={this.props.nextAction}>
                    Next
                </button>
            </div>
        </div>;
    }
}

function mapStateToProps(state: any, ownProps: ResultsProps) {
    return {
        pair: state.getIn(['vote', 'pair']),
        tally: state.getIn(['vote', 'tally']),
        winner: state.get('winner')
    }
}

function mapDispatchToProps(): ResultsConnectedDispatch {
    return {
        nextAction: actionCreators.nextAction
    };
} 

export const ResultsContainer = 
    connect<any, any, ResultsProps>(
        mapStateToProps,
        mapDispatchToProps
    )(Results);