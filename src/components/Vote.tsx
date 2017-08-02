import * as React from 'react';
import {List, Map} from 'immutable';

export interface VoteProps {
    pair?: List<string>;
    hasVoted?: string;
}

export interface VoteState {};

export interface VoteConnectedDispatch {
    voteAction?: (entry: string) => void;
}

const defaultArr: List<string> = List();
export default class Vote extends React.PureComponent<VoteProps & VoteConnectedDispatch, VoteState> {
    getPair(): List<string> {
        return this.props.pair || defaultArr;
    }

    isDisabled(): boolean {
        return !!this.props.hasVoted;
    }

    hasVotedFor(entry: string): boolean {
        return this.props.hasVoted === entry;
    }

    render() {
        return <div className="voting">
            {this.getPair().map((entry: string) => 
                <button key={entry} // Not NULL/Undefined
                    disabled={this.isDisabled()}
                    onClick={()=>this.props.voteAction ? this.props.voteAction(entry) : null}>
                    <h1>{entry}</h1>
                    {this.hasVotedFor(entry)?
                        <div className="label">Voted</div>:
                        null}
                </button>
            )}
        </div>;
    }
}