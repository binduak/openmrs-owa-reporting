import React from 'react';
import ReportList from "./ReportList";
import {mount, shallow} from 'enzyme';
import {FormGroup} from "react-bootstrap";


describe('Tests for ReportList table rendering', () => {
    it('Check if ReactTable & FormGroup are rendered in the ReportList', () => {

        const onDownloadReportSpy = jest.fn();
        const onRunReportSpy = jest.fn();
        const onSelectChangeSpy = jest.fn();

        const wrapper = mount(<ReportList data={[
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
            }]}
                                          onRunReport={onRunReportSpy}
                                          onDownloadReport={onDownloadReportSpy}
                                          onSelectChange={onSelectChangeSpy}
        />);
        expect(wrapper.find(FormGroup).length).toEqual(1);
        expect(wrapper.find("ReactTable").length).toEqual(1);
    });

    it('should be able to change the start date, end date, format and click render button', () => {
        const onDownloadReportSpy = jest.fn();
        const onRunReportSpy = jest.fn();
        const onSelectChangeSpy = jest.fn();

        const wrapper = mount(<ReportList data={[
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
                "endDate": "2018-01-01",
                "format": "CSV"
            }]}
                                            onRunReport={onRunReportSpy}
                                            onDownloadReport={onDownloadReportSpy}
                                            onSelectChange={onSelectChangeSpy}
        />);
        wrapper.find('#editstartDate1').simulate('change', { target: {value: '2018-01-01'} });
        expect(onSelectChangeSpy.mock.calls.length).toBe(1);
        expect(onSelectChangeSpy.mock.calls[0][0]).toBe(1);
        expect(onSelectChangeSpy.mock.calls[0][1]).toBe("startDate");
        expect(onSelectChangeSpy.mock.calls[0][2]).toBe("2018-01-01");

        wrapper.find('#editendDate1').simulate('change', { target: {value: '2018-01-31'} });
        expect(onSelectChangeSpy.mock.calls.length).toBe(2);
        expect(onSelectChangeSpy.mock.calls[1][0]).toBe(1);
        expect(onSelectChangeSpy.mock.calls[1][1]).toBe("endDate");
        expect(onSelectChangeSpy.mock.calls[1][2]).toBe("2018-01-31");

        wrapper.find('#reportFormat1').simulate('change', { target: {value: 'CSV'} });
        expect(onSelectChangeSpy.mock.calls.length).toBe(3);
        expect(onSelectChangeSpy.mock.calls[2][0]).toBe(1);
        expect(onSelectChangeSpy.mock.calls[2][1]).toBe("format");
        expect(onSelectChangeSpy.mock.calls[2][2]).toBe("CSV");

        wrapper.find('#runReportButton1').last().simulate('click');
        expect(onRunReportSpy.mock.calls.length).toBe(1);
        expect(onRunReportSpy.mock.calls[0][0].uuid).toBe("5123c91d-81f6-41ae-8c45-f974b52d0c0a");
        expect(onRunReportSpy.mock.calls[0][0].display).toBe("Custom Report Sample");
        expect(onRunReportSpy.mock.calls[0][0].startDate).toBe("2017-01-01");
        expect(onRunReportSpy.mock.calls[0][0].endDate).toBe("2018-01-01");
        expect(onRunReportSpy.mock.calls[0][0].format).toBe("CSV");
    });
});