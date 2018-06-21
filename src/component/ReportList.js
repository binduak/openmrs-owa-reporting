import React, {Component} from "react";
import PropTypes from 'prop-types';
import ReactTable from "react-table";
// import "react-table/react-table.css";
import "./styles/react-table.css"
import "./ReportList.css";
import {Button, FormGroup} from "react-bootstrap";
import moment from "moment";
import {Translate} from "react-redux-i18n";
import sleep from 'sleep-promise';


export default class ReportList extends Component {
    constructor() {
        super();
        this.renderEditable = this.renderEditable.bind(this);
        this.runButton = this.runButton.bind(this);
        this.rendererFormat = this.rendererFormat.bind(this);
        this.validateInputs = this.validateInputs.bind(this);

    }

    validateInputs(report) {
        const startDate = report.startDate ? moment(report.startDate).format("YYYY-MM-DD") : null;
        const endDate = report.endDate ? moment(report.endDate).format("YYYY-MM-DD") : null;

        if (!startDate || !endDate || !report.format) {
            let msg = [];

            if (!startDate) {
                msg.push("START DATE");
            }
            if (!endDate) {
                msg.push("END DATE");
            }
            if (!report.format)
                msg.push("FORMAT");

            alert("please select " + msg);
          return false;
        }
        return true;
    }

    renderEditable (cellInfo) {
        return (
            <input id={"edit"+ cellInfo.column.id+cellInfo.index} type="date"
                   onChange={(e) => {
                       this.props.onSelectChange(cellInfo.index, cellInfo.column.id, e.target.value);
                   }}
            />
        );
    }

    rendererFormat(cellInfo) {
        return (
            <select id={"reportFormat"+ cellInfo.index}
                onChange={e => {
                    this.props.onSelectChange(cellInfo.index, cellInfo.column.id, e.target.value);
                }} required>
                <option value="-1">Choose Format</option>
                <option value="org.openmrs.module.reporting.report.renderer.CsvReportRenderer">CSV</option>
                <option value="org.openmrs.module.reporting.report.renderer.XmlReportRenderer">XML</option>
                <option value="org.openmrs.module.reporting.report.renderer.XlsReportRenderer">EXCEL</option>
            </select>
        );
    };

    runButton(cellInfo) {
        return (<div >
            <Button bsStyle="success" id={"runReportButton"+ cellInfo.index} className="runButton" onClick={() => {
               if(this.validateInputs(this.props.data[cellInfo.index]))
                this.props.onRunReport(this.props.data[cellInfo.index], cellInfo.index);
            }}>Run
                Now
            </Button>
            <span/>
            <Button bsStyle="success" disabled={!this.props.data[cellInfo.index].enableDownloadButton}
                    className="runButton" onClick={() => {
                        this.props.onDownloadReport(this.props.data[cellInfo.index], cellInfo.index);
                    }}>Download
            </Button>

        </div>);
    };

    render() {
        return (
            <div>
                <FormGroup>
                    <ReactTable
                        showPaginationBottom={false}
                        data={this.props.data}
                        columns={[
                            {
                                Header: <label> Reports </label>,
                                columns: [
                                    {
                                        Header: <Translate value="REPORTS_NAME_HEADER_KEY"/>,
                                        id: "display",
                                        width: 450,
                                        accessor: d => d.display
                                    },
                                    {
                                        Header: <div><label className="headerFont">Start Date</label> <span className="asterick">*</span> </div>,
                                        id: "startDate",
                                        width: 180,
                                        height: '100%',
                                        Cell: this.renderEditable
                                    },
                                    {
                                        Header: <div><label className="headerFont">End Date</label> <span className="asterick">*</span> </div>,
                                        id: "endDate",
                                        width: 180,
                                        Cell: this.renderEditable
                                    },
                                    {
                                        Header: <div><label className="headerFont">Format</label> <span className="asterick">*</span> </div>,
                                        id: "format",
                                        width: 150,
                                        height: 500,
                                        Cell: this.rendererFormat
                                    },
                                    {
                                        Header: "",
                                        width: 400,
                                        Cell: this.runButton
                                    }
                                ]
                            }
                        ]}
                        className="-striped -highlight"
                    >
                    </ReactTable>
                </FormGroup>
            </div>
        )
    }
}

ReportList.PropTypes = {
    data: PropTypes.object,
    onRunReport: PropTypes.func.isRequired,
    onDownloadReport: PropTypes.func.isRequired,
    onSelectChange: PropTypes.func.isRequired
};