import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {reportsPageActions} from "./ducks/reportsPageDuck";
import PropTypes from 'prop-types';
import ReportsPage from "./container/ReportsPage";
import {Row, Grid} from "react-bootstrap";
import HeaderContainer from "./component/Header";



class App extends Component {

    componentWillMount() {
        this.props.actions.onChangeLanguage("en");
    }

    render() {
        return (
            <div className="App">
                <Grid fluid="true" >
                    <HeaderContainer/>
                    <Row className="row">
                        <ReportsPage />
                    </Row>
                </Grid>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({...reportsPageActions}, dispatch)
    }
};

const mapStateToProps = (state) => {
    return {
        reports: state.reports
    };
};

App.PropTypes = {
    actions: PropTypes.shape({
        reportsPageActions: PropTypes.func.isRequired
    })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

