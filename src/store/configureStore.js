import {createStore, compose, applyMiddleware} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import promise from 'redux-promise-middleware';
import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';
import en from '../locale/locale_en.json';
import fr from '../locale/locale_fr.json';
// import {REPORT_REQUEST_DATA_SUCCESS} from "../ducks/reportsPageDuck";;
// import {createEpicMiddleware, combineEpics } from 'redux-observable';
// import {fetchUserEpic} from '../ducks/reportsPageDuck.js'



// export const rootEpic = combineEpics(fetchUserEpic);


function configureStoreProd(initialState) {
    const middlewares = [
        reduxImmutableStateInvariant(),
        thunk,
        thunk,
        promise()
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

    let store = createStore(rootReducer, initialState, composeEnhancers(
        applyMiddleware(...middlewares)
        )
    );
    syncTranslationWithStore(store);
    store.dispatch(loadTranslations({'en': en}));
    store.dispatch(setLocale('en'));
    return store;
}

function configureStoreDev(initialState) {
    const middlewares = [
        reduxImmutableStateInvariant(),
        thunk,
        thunk,
        promise()
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
    const store = createStore(rootReducer, initialState, composeEnhancers(
        applyMiddleware(...middlewares)
        )
    );
    syncTranslationWithStore(store);
    store.dispatch(loadTranslations({'en': en}));
    store.dispatch(setLocale('en'));



    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers').default; // eslint-disable-line global-require
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;