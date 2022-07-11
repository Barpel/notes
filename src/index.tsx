import React from 'react';
import ReactDOM from 'react-dom/client';
import { Store, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './App';
import reducer from './store/notes/reducer';
import { NoteState, DispatchType, NoteAction } from './store/notes/interfaces';

const store: Store<NoteState, NoteAction> & {
  dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk));
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

