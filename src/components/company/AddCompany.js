import React, { Component } from "react";
import CompanyService from '../../services/company/company.service.js';

export default class AddCompany extends Component {
    constructor(props) {
        super(props);
        this.onChangeCode = this.onChangeCode.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCeoName = this.onChangeCeoName.bind(this);
        this.onChangeTurnOver = this.onChangeTurnOver.bind(this);
        this.onChangeWebsite = this.onChangeWebsite.bind(this);
        this.onChangeStockExchange = this.onChangeStockExchange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.addCompany = this.addCompany.bind(this);

        this.state = {
            code: "",
            name: "",
            ceoName: "",
            turnOver: "",
            website: "",
            stockExchange: "",
            submitted: false,
            errors: "",
            error: false,
            compCodeError: false
        };
    }

    onChangeCode(e) {
        var regExp = new RegExp(/[^0-9a-zA-Z]/);

        if (e.target.value === '' || !regExp.test(e.target.value)) {
            this.setState({
                code: e.target.value
            });
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeCeoName(e) {
        this.setState({
            ceoName: e.target.value
        });
    }

    onChangeTurnOver(e) {
        var regExp = new RegExp(/^\d*\.?\d*$/);

        if (e.target.value === '' || regExp.test(e.target.value)) {
            this.setState({
                turnOver: e.target.value
            });
        }
    }

    onChangeWebsite(e) {
        this.setState({
            website: e.target.value
        });
    }

    onChangeStockExchange(e) {
        this.setState({
            stockExchange: e.target.value
        });
    }

    handleValidation() {
        let errors = {};
        let formIsValid = true;

        if (typeof this.state.code !== "undefined") {
            if (this.state.code.match(/[^0-9a-zA-Z]/)) {
                formIsValid = false;
                errors["code"] = "Only Alphanumeric";
            }
        }

        if (typeof this.state.turnOver !== "undefined") {
            if (parseFloat(this.state.turnOver) < 100000000) {
                formIsValid = false;
                errors["turnOver"] = "Should be more than 10 Cr";
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    addCompany(e) {
        e.preventDefault();
        if (this.handleValidation()) {

            var data = {
                code: this.state.code,
                name: this.state.name,
                ceoName: this.state.ceoName,
                turnOver: parseFloat(this.state.turnOver),
                website: this.state.website,
                stockExchange: this.state.stockExchange
            };

            CompanyService.addCompany(data)
                .then(response => {
                    this.setState({
                        code: "",
                        name: "",
                        ceoName: "",
                        turnOver: "",
                        website: "",
                        stockExchange: "",
                        submitted: true,
                    });
                    console.log(response.data);
                })
                .catch(e => {
                    if (e.response.data.indexOf("Resource with specified id or name already exists.")) {
                        this.setState({
                            compCodeError: true
                        });
                    }
                    else {
                        this.setState({
                            error: true
                        });
                    }
                    console.log(e);
                });
        }
    }

    render() {
        return (
            <form className="companyForm" onSubmit={this.addCompany} >
                <h2>Add Company</h2>
                {this.state.submitted ? (
                    <label style={{ color: "green" }}>Company added successfully!</label>
                ) : this.state.compCodeError ? (
                    <label style={{ color: "red" }}>Company Code already exists. Please give unique Company Code!</label>
                ) : this.state.error ? (
                    <label style={{ color: "red" }}>Error Occured!</label>
                ) : (
                    <label ></label>
                )}
                <div>
                    <div className="form-group">
                        <label htmlFor="companyCode">Company Code</label>
                        <input
                            type="text"
                            className="form-control"
                            id="companyCode"
                            required
                            value={this.state.code}
                            onChange={this.onChangeCode}
                            name="companyCode"
                        />
                        <span style={{ color: "red" }}>{this.state.errors["code"]}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="companyName">Comany Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="companyName"
                            required
                            value={this.state.name}
                            onChange={this.onChangeName}
                            name="companyName"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ceoName">CEO Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="ceoName"
                            required
                            value={this.state.ceoName}
                            onChange={this.onChangeCeoName}
                            name="ceoName"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="turnOver">Turn Over</label>
                        <input
                            type="text"
                            className="form-control"
                            id="turnOver"
                            required
                            value={this.state.turnOver}
                            onChange={this.onChangeTurnOver}
                            name="turnOver"
                        />
                        <span style={{ color: "red" }}>{this.state.errors["turnOver"]}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="website">Website</label>
                        <input
                            type="url"
                            className="form-control"
                            id="website"
                            required
                            value={this.state.website}
                            onChange={this.onChangeWebsite}
                            name="website"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stockExchange">Stock Exchange</label>
                        <input
                            type="text"
                            className="form-control"
                            id="stockExchange"
                            required
                            value={this.state.stockExchange}
                            onChange={this.onChangeStockExchange}
                            name="stockExchange"
                        />
                    </div>
                    <button type="submit" className="btn btn-success">
                        Add
                    </button>
                </div>
            </form>
        );
    }
};