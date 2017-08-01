import * as React from 'react';
import {connect} from 'react-redux';
import Winner from './Winner';
import {WinnerProps, WinnerState} from './Winner';
import Vote from './Vote';
import {VoteProps, VoteConnectedDispatch} from './Vote';
import * as actionCreators from '../action_creators';

export interface VotingProps extends VoteProps {
    children?: any;
}

export interface VotingState {}

export class Voting extends React.PureComponent <VotingProps & VoteConnectedDispatch & WinnerProps, VotingState>
{
    render() {
        return <div>
            {this.props.winner?
                <Winner ref="winner" winner={this.props.winner} />:
                <Vote {...this.props} />}
            </div>;
    }
}

function mapStateToProps(state: any, ownProps: VotingProps) {
    return {
        pair: state.getIn(['vote', 'pair']),
        hasVoted: state.get('hasVoted'),
        winner: state.get('winner')
    };
}

function mapDispatchToProps(): VoteConnectedDispatch {
    return {
        voteAction: actionCreators.voteAction
    };
} 

export const VotingContainer = connect<any, any, VotingProps>(
    mapStateToProps,
    mapDispatchToProps
)(Voting);