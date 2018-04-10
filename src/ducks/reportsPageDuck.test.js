import React from 'react';
import {reportPageReducer, reportsPageActions} from "./reportsPageDuck";


describe('reportsPageDuck tests', () => {

    it('ensure that the state gets updated with new startDate',() => {
        const currentState = {
            "isLoading": false,
            "reportData": {
                "results": [
                    {
                        "uuid": "41f98669-5ae4-4fb2-b2a0-3e0485f83635",
                        "display": "Period Indicator Sample",
                        "startDate": "",
                        "endDate": "",
                        "format": ""
                    },
                    {
                        "uuid": "5123c91d-81f6-41ae-8c45-f974b52d0c0a",
                        "display": "Custom Report Sample",
                        "startDate": "",
                        "endDate": "",
                        "format": ""
                    },
                    {
                        "uuid": "2a8f3cfc-5a88-4ff3-bac7-bb6439bd42c9",
                        "display": "PeriodIndictor 2 Sample",
                        "startDate": "",
                        "endDate": "",
                        "format": ""
                    },
                    {
                        "uuid": "48ae1274-f756-4050-ae3f-4a6ee83112c0",
                        "display": "Row-per-patient Dataset",
                        "startDate": "",
                        "endDate": "",
                        "format": ""
                    },
                    {
                        "uuid": "b9513942-811e-4021-be21-aa30a049e151",
                        "display": "test report form",
                        "startDate": "",
                        "endDate": "",
                        "format": ""
                    },
                    {
                        "uuid": "ffa66268-b33e-49a8-8390-ba4cfe6f5960",
                        "display": "Test Report",
                        "startDate": "",
                        "endDate": "",
                        "format": ""
                    },
                    {
                        "uuid": "739f5218-9b26-4d89-a7b9-687ea59846e5",
                        "display": "Test Period Indicator report",
                        "startDate": "",
                        "endDate": "",
                        "format": ""
                    },
                    {
                        "uuid": "bff81763-ffe5-433d-b61f-a25ebf7d1be0",
                        "display": "Custom Report Latest",
                        "startDate": "",
                        "endDate": "",
                        "format": ""
                    }
                ]
            },
            "requestData": [],
            "success": true
        };

        const action = { data: {index: 1, columnName: 'startDate', value: '2017-01-01'}, type: 'CHANGE'};

        const updatedState = reportPageReducer(currentState, action);
        expect(updatedState).toEqual({
            "isLoading": false,
            "reportData": {
                "results": [
                    {
                        "uuid": "41f98669-5ae4-4fb2-b2a0-3e0485f83635",
                        "display": "Period Indicator Sample",
                        "startDate": "",
                        "endDate": "",
                        "format": ""
                    },
                    {
                        "uuid": "5123c91d-81f6-41ae-8c45-f974b52d0c0a",
                        "display": "Custom Report Sample",
                        "startDate": "2017-01-01",
                        "endDate": "",
                        "format": ""
                    },
                    {
                        "uuid": "2a8f3cfc-5a88-4ff3-bac7-bb6439bd42c9",
                        "display": "PeriodIndictor 2 Sample",
                        "startDate": "",
                        "endDate": "",
                        "format": ""
                    },
                    {
                        "uuid": "48ae1274-f756-4050-ae3f-4a6ee83112c0",
                        "display": "Row-per-patient Dataset",
                        "startDate": "",
                        "endDate": "",
                        "format": ""
                    },
                    {
                        "uuid": "b9513942-811e-4021-be21-aa30a049e151",
                        "display": "test report form",
                        "startDate": "",
                        "endDate": "",
                        "format": ""
                    },
                    {
                        "uuid": "ffa66268-b33e-49a8-8390-ba4cfe6f5960",
                        "display": "Test Report",
                        "startDate": "",
                        "endDate": "",
                        "format": ""
                    },
                    {
                        "uuid": "739f5218-9b26-4d89-a7b9-687ea59846e5",
                        "display": "Test Period Indicator report",
                        "startDate": "",
                        "endDate": "",
                        "format": ""
                    },
                    {
                        "uuid": "bff81763-ffe5-433d-b61f-a25ebf7d1be0",
                        "display": "Custom Report Latest",
                        "startDate": "",
                        "endDate": "",
                        "format": ""
                    }
                ]
            },
            "requestData": [],
            "success": true
        });
    });

    it('return isLoading true when REPORT_FETCH_PENDING is dispatched', () => {
        const updatedState = reportPageReducer({isLoading: false, reportData: { results:[1,2,3]}}, { type: 'REPORT_FETCH_PENDING'});
        expect(updatedState).toEqual({isLoading: true, reportData: { results: []}});
    });

    it('should return pending while calling the fetchReportDefinition', () => {
        const identity = (a) => a;
        const action = reportsPageActions.fetchAllReportDefinitions();
        const mockCallback = jest.fn();
        action(mockCallback);
        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback.mock.calls[0][0]).toEqual({type:'REPORT_FETCH_PENDING'});
    });


    // it('should wait and retry for 5 times before giving up',() => {
    //     fetch.mockResponse(JSON.stringify({status: 'COMPLETED' }))
    // });
});

