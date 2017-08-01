import {fromJS} from 'immutable';

export default (socket: any) => (store: any) => (next: any) => (action: any) => {
    if (action.meta && action.meta.remote) {
        socket.emit('action', action);
    }    
    return next(fromJS(action));
}