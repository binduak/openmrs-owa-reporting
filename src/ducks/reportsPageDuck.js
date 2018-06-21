import fileDownload from 'react-file-download';
import {fromJS} from "immutable";
import { loadTranslations, setLocale } from 'react-redux-i18n';
import en from '../locale/locale_en.json';
import fr from '../locale/locale_fr.json';

const REPORT_FETCH_PENDING = 'REPORT_FETCH_PENDING';
const REPORT_FETCH_SUCCESS = 'REPORT_FETCH_SUCCESS';
const REPORT_FETCH_FAILED = 'REPORT_FETCH_FAILED';
const REPORT_REQUEST_PENDING = 'REPORT_REQUEST_PENDING';
const REPORT_REQUEST_SUCCESS = 'REPORT_REQUEST_SUCCESS';
const REPORT_REQUEST_FAILED = 'REPORT_REQUEST_FAILED';
const REPORT_REQUEST_DATA_PENDING = 'REPORT_REQUEST_DATA_PENDING';
export const REPORT_REQUEST_DATA_SUCCESS = 'REPORT_REQUEST_DATA_SUCCESS';
const REPORT_REQUEST_DATA_FAILED = 'REPORT_REQUEST_DATA_FAILED';

const CHANGE = 'CHANGE';

const initialState = {
    isLoading: false,
    reportData: [],
    requestData: []
};


const setAppLanguage = (dispatch, selectedLanguage, translationsJson) => {
    let translations = {};
    translations[selectedLanguage] = translationsJson;
    dispatch(loadTranslations(translations));
    dispatch(setLocale(selectedLanguage));
};

const onChangeLanguage = (selectedLanguage) => {
    return (dispatch) => {
            setAppLanguage(dispatch, selectedLanguage, en);
        }
    };

const fetchAllReportDefinitions = () => {
    return (dispatch) => {
        dispatch({type: REPORT_FETCH_PENDING});
        return getReportDefinitionCall().then(data =>
            dispatch({type: REPORT_FETCH_SUCCESS, data})
        ).catch(data =>
            dispatch({type: REPORT_FETCH_FAILED, data})
        );
    }
};

const createReportRequest = (index, reportDefinitionUuid, startDate, endDate, format) => {
    return (dispatch) => {
        dispatch({type: REPORT_REQUEST_PENDING});
        return createReportRequestCall(reportDefinitionUuid, startDate, endDate, format).then(data =>
            getReportRequestData(data, data.uuid, 0, index)(dispatch)
        ).catch(data =>
            dispatch({type: REPORT_REQUEST_FAILED, data})
        );
    }
};

const getReportRequestData = (data, reportRequestUuid, counter, index) => {
    return (dispatch) => {
        dispatch({type: REPORT_REQUEST_DATA_PENDING});
        return getReportRequestCall(reportRequestUuid).then(data =>
                ensureReportRequestCallIsCompleted(data, reportRequestUuid, index, counter, dispatch)
        ).catch(data =>
            dispatch({type: REPORT_REQUEST_DATA_FAILED, data})
        );
    }
};

const ensureReportRequestCallIsCompleted = (data, reportRequestUuid, index, counter, dispatch) => {
    if(data.status === "COMPLETED" || data.status === "SAVED" || data.status === "FAILED" ){
         dispatch({type: REPORT_REQUEST_SUCCESS, data:{data, index}});
       return dispatch({type: REPORT_REQUEST_DATA_SUCCESS, data:{data, index}});
    }
    if(counter > 15 ){
            return;
    }

    setTimeout(() => {
        getReportRequestData(data, reportRequestUuid, counter+1, index)(dispatch)
    }, 3000);
};

const changeData = (index, columnName, value) => {
    return (dispatch) => {
      dispatch({type: CHANGE, data: {index, columnName, value}});
    };
};

const getReportDefinitionCall = async () => {
    const response = await fetch(`/openmrs/ws/rest/v1/reportingrest/reportDefinition`,
        {
            method: 'GET',
            credentials: 'include'
        }
    );
    const data = await response.json();
    return data;
};

const createReportRequestCall = async (uuid, startDate, endDate, format) => {
    const postBody = {
        "status": "REQUESTED",
        "priority": "NORMAL",
        "reportDefinition": {
            "parameterizable": {
                "uuid": uuid
            },
            "parameterMappings": {
                "startDate": startDate,
                "endDate": endDate
            }
        },
        "renderingMode": format
    };

    const response = await fetch(`/openmrs/ws/rest/v1/reportingrest/reportRequest`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            // "Access-Control-Request-Headers":"Content-Type",
            // "Access-Control-Request-Method":'POST',
            // "Access-Control-Allow-Origin": "https://192.168.33.11"
        },
        body: JSON.stringify(postBody)
    });
    const data = await response.json();
    return data;
};

const getReportRequestCall = async (reportRequestUuid) => {
    const response = await fetch(`/openmrs/ws/rest/v1/reportingrest/reportRequest/${reportRequestUuid}`,
        {
            method: 'GET',
            credentials: 'include',
        }
    );
    const data = await response.json();
    return data;
};

const downloadFile = async (uuid) => {
    const response = await fetch(`/openmrs/module/reporting/reports/viewReport.form?uuid=${uuid}`,{
        method: 'GET',
        credentials: 'include'
    });
    const blobData = await response.blob();
    const headers = await response.headers;
    const fileName = response.headers.get('content-disposition').split("=").pop();
    fileDownload(blobData, fileName);
};

const downloadReport = (uuid) => {
    return (dispatch) =>  {
        downloadFile(uuid).then(
            dispatch({type: '', data: {}})
        );
    }
};

const reportPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case REPORT_FETCH_PENDING: {
            return Object.assign({}, state, {isLoading: true}, {reportData: {results: []}});
        }
        case REPORT_FETCH_SUCCESS: {
            const data = action.data.results.reduce((result, item, index) => {
                result[index] = {
                    'uuid': item.uuid,
                    'display': item.display,
                    'startDate': "",
                    'endDate': "",
                    'format': "",
                    'reportRequestUuid':"",
                    'enableDownloadButton': false,
                    'reportRequestStatus':""
                };
                return result;
            }, []);
            return Object.assign({}, state, {isLoading: false}, {reportData: {results: data}});
        }
        case REPORT_FETCH_FAILED: {
            return Object.assign({}, state, {isLoading: false}, {reportData: action.data});
        }
        case REPORT_REQUEST_PENDING: {
            return Object.assign({}, state)
        }
        case REPORT_REQUEST_SUCCESS: {
            const stateMap = fromJS(state);
            const currentRecordValue = stateMap.getIn(["reportData", "results"]).get(action.data.index);
            const updatedRecordValue = currentRecordValue.set("reportRequestUuid", action.data.data.uuid).set("reportRequestStatus", action.data.data.status);
            const results = stateMap.getIn(["reportData","results"]).set(action.data.index,updatedRecordValue);
            return stateMap.setIn(["reportData","results"], results).toJS();
        }
        case REPORT_REQUEST_FAILED: {
            return Object.assign({}, state, { reportRequestError: action.data});
        }
        case REPORT_REQUEST_DATA_PENDING: {
            return Object.assign({}, state);
        }
        case REPORT_REQUEST_DATA_SUCCESS: {
            const stateMap = fromJS(state);
                const currentRecordValue = stateMap.getIn(["reportData", "results"]).get(action.data.index);
                const updatedRecordValue = currentRecordValue.set("reportRequestStatus", action.data.data.status).set('enableDownloadButton', true);
                const results = stateMap.getIn(["reportData", "results"]).set(action.data.index, updatedRecordValue);
                return stateMap.setIn(["reportData","results"], results).toJS();
            return state;
        }
        case REPORT_REQUEST_DATA_FAILED: {
            return Object.assign({}, state, { reportRequestDataError: action.data});
        }
        case CHANGE: {
            const stateMap = fromJS(state);
            const currentRecordValue = stateMap.getIn(["reportData", "results"]).get(action.data.index);
            const updatedRecordValue = currentRecordValue.set(action.data.columnName, action.data.value);
            const results = stateMap.getIn(["reportData","results"]).set(action.data.index,updatedRecordValue);
            return stateMap.setIn(["reportData","results"], results).toJS();
        }
        default :
            return state;
    }
};

const reportsPageActions = {onChangeLanguage, fetchAllReportDefinitions, createReportRequest, getReportRequestData, changeData, downloadReport};

export {reportsPageActions, reportPageReducer};

