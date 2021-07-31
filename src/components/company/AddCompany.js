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
        this.addCompany = this.addCompany.bind(this);

        this.state = {
            code: "",
            name: "",
            ceoName: "",
            turnOver: "",
            website: "",
            stockExchange: "",
            submitted: false,
            allfieldsRequired: false
        };
    }

    onChangeCode(e) {
        this.setState({
            code: e.target.value
        });
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
        this.setState({
            turnOver: e.target.value
        });
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

    addCompany() {

        if (this.state.code && this.state.name && this.state.ceoName && this.state.turnOver && this.state.website && this.state.stockExchange) {

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
                        allfieldsRequired: false
                    });
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
        else {
            this.setState({
                allfieldsRequired: true
            });
        }
    }

    render() {
        return (
            <div className="submit-form">
                <h2>Add Company</h2>
                {this.state.allfieldsRequired ? (
                    <h4>All fields are Mandatory!</h4>
                ) : this.state.submitted ? (
                    <h4>Company added successfully!</h4>
                ) : (
                    <h4></h4>
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
                            type="number"
                            className="form-control"
                            id="turnOver"
                            required
                            value={this.state.turnOver}
                            onChange={this.onChangeTurnOver}
                            name="turnOver"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="website">Website</label>
                        <input
                            type="text"
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
                    <button onClick={this.addCompany} className="btn btn-success">
                        Submit
                    </button>
                </div>
            </div >
        );
    }
};