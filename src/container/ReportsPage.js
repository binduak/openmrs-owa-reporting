import React, {Component} from "react";
import {connect} from "react-redux";
import {reportsPageActions} from "../ducks/reportsPageDuck";
import {bindActionCreators} from "redux";
import ReportList from "../component/ReportList";
import PropTypes from 'prop-types';
import {Alert, Col} from "react-bootstrap";
import { debounce } from 'lodash';

class ReportsPage extends Component {
    constructor() {
        super();
        this.onRunReport = this.onRunReport.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onDownloadReport = this.onDownloadReport.bind(this);
    };

    componentWillMount() {
        this.props.actions.fetchAllReportDefinitions();
    }

    render() {
        const data =
            {
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
            };

        return (
            <Col xs={14} md={12}>
                <ReportList data={this.props.reports.reportData.results}
                            onRunReport={this.onRunReport} onSelectChange={this.onSelectChange}
                            onDownloadReport={this.onDownloadReport} getReportData={this.getReportData}/>
            </Col>);
    }

    onRunReport(report, index) {
        this.props.actions.createReportRequest(index, report.uuid, report.startDate, report.endDate, report.format);
    }

    onSelectChange(report, columnName, value) {
        this.props.actions.changeData(report, columnName, value);
    }

    onDownloadReport(report, index) {
            this.props.actions.downloadReport(report.reportRequestUuid);

    }
}

ReportsPage.PropTypes = {
    actions: PropTypes.shape({
        reportsPageActions: PropTypes.func.isRequired
    }),
    reports: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        reports: state.reports
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({...reportsPageActions}, dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReportsPage);

