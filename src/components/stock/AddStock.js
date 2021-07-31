import React, { Component } from "react";
import StockService from '../../services/stock/stock.service.js';
import CompanyService from '../../services/company/company.service.js';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

export default class AddStock extends Component {
    constructor(props) {
        super(props);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.addStock = this.addStock.bind(this);

        this.state = {
            companyCode: "",
            companyName: "",
            stockPrice: "",
            companies: [],
            submitted: false,
            allfieldsRequired: false
        };
    }

    onChangePrice(e) {
        this.setState({
            stockPrice: e.target.value
        });
    }

    componentDidMount() {
        CompanyService.getAllCompany()
            .then(response => {
                if (response && response.data && response.data.companies) {
                    this.setState({
                        companies: response.data.companies
                    });
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    handleSelect(e) {
        let cCode = e.split(",")[0];
        let cName = e.split(",")[1];
        this.setState({
            companyCode: cCode,
            companyName: cName
        });
    }

    addStock() {

        if (this.state.companyCode && this.state.stockPrice) {

            var data = {
                companyCode: this.state.companyCode,
                stockPrice: parseFloat(this.state.stockPrice)
            };

            StockService.addStock(data)
                .then(response => {
                    this.setState({
                        companyCode: "",
                        companyName: "",
                        stockPrice: "",
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
                <h2>Add Stock Price</h2>
                {this.state.allfieldsRequired ? (
                    <h4>All fields are Mandatory!</h4>
                ) : this.state.submitted ? (
                    <h4>Stock Price added successfully!</h4>
                ) : (
                    <h4></h4>
                )}
                <div>
                    <div className="form-group">
                        <DropdownButton alignRight title="Select Company" onSelect={this.handleSelect}>
                            {this.state.companies.map(item => (
                                <Dropdown.Item key={item.code} eventKey={item.code + "," + item.name}>{item.name}</Dropdown.Item>
                            ))
                            }
                        </DropdownButton>
                    </div>
                    <div className="form-group">
                        <label htmlFor="compName">Company Name</label>
                        <input
                            id="compName"
                            type="text"
                            className="form-control"
                            value={this.state.companyName}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stockPrice">Stock Price</label>
                        <input
                            type="text"
                            className="form-control"
                            id="stockPrice"
                            required
                            value={this.state.stockPrice}
                            onChange={this.onChangePrice}
                            name="stockPrice"
                        />
                    </div>
                    <button onClick={this.addStock} className="btn btn-success right">
                        Submit
                    </button>
                </div>
            </div >
        );
    }
};