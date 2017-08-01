import * as React from 'react';

export interface WinnerProps {
    winner?: string;
}

export interface WinnerState {}

export default class Winner extends React.PureComponent <WinnerProps, WinnerState> {
    render() {
        return <div className="winner">
            Winner is {this.props.winner}!
        </div>;
    }
}