import {combineReducers} from "redux";
// import 'rxjs';
import {reportPageReducer as reports} from "../ducks/reportsPageDuck";
import { loadTranslations, setLocale, syncTranslationWithStore, i18nReducer } from 'react-redux-i18n';

const rootReducer = combineReducers({
    reports,
    i18n: i18nReducer
});

export default rootReducer;