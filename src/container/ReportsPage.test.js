import React from 'react';
import {shallow} from "enzyme";
import ReportsPage from "./ReportsPage";

xdescribe('Tests for ReportsPage Rendering', () => {
    it('Should pass elements to children', () => {

        const reports = {
            reportData: {
                results: [1, 2, 3, 4]
            }
        };

        const reportPage = shallow(
            <ReportsPage actions={
                () => {
                }
            } reports={reports}/>
        );

    });
});