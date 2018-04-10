import React, {Component} from "react";
import './styles/header.css';

export default class HeaderContainer extends Component {

    render() {
        return (<div>
            <header className="header">
                <a className="back-btn" href="/home">
                    <i className="fa fa-home"></i>
                </a>
                <a className="headerText">OpenMRS Reports</a>
            </header>
                &nbsp;</div>

        );
    }
}
