import * as React from 'react';

export interface AppProps {
    children?: any;
}

export interface AppState {}

export default class App extends React.Component<AppProps, AppState> {
    render() {
        return this.props.children;
    }
}
