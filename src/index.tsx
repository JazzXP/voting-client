import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Route, HashRouter} from 'react-router-dom';
import * as Redux from 'redux';
import {Provider} from 'react-redux';
import * as io from 'socket.io-client';
import reducer from './reducer';
import {setStateAction, VotingClientState} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import App from './components/App';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';

const socket = io.connect(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', (state: any) => {
    store.dispatch(setStateAction(state));
});

const createStoreWithMiddleware = Redux.applyMiddleware(
    remoteActionMiddleware(socket)
)(Redux.createStore);
const store: Redux.Store<VotingClientState> = createStoreWithMiddleware(reducer);

const routes = 
    <div>
        <Route path="/results" component={ResultsContainer} />
        <Route exact path="/" component={VotingContainer} />
    </div>;

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            {routes}
        </HashRouter>
    </Provider>,
    document.getElementById('app')
);