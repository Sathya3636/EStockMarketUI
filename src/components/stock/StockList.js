import React, { Component } from "react";
import StockService from '../../services/stock/stock.service.js';
import CompanyService from '../../services/company/company.service.js';
import Container from 'react-bootstrap/Container';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import "./StockStyles.css";

export default class StockList extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onEndDateChange = this.onEndDateChange.bind(this);
        this.getStocks = this.getStocks.bind(this);
        this.state =
        {
            companies: [],
            stocks: [],
            code: "",
            name: "",
            minPrice: "",
            maxPrice: "",
            avgPrice: "",
            noStocks: false,
            startDate: new Date(),
            endDate: new Date(),
            spinner: false
        };
    }

    componentDidMount() {
        this.setState({
            spinner: true
        });
        CompanyService.getAllCompany()
            .then(response => {
                if (response && response.data && response.data.companies) {
                    this.setState({
                        companies: response.data.companies,
                        spinner: false
                    });
                }
            })
            .catch(e => {
                console.log(e);
                this.setState({
                    spinner: false
                });
            });
    };

    getStocks() {
        this.setState({
            spinner: true
        });
        StockService.getStocks(this.state.code, this.state.startDate, this.state.endDate)
            .then(response => {
                if (response && response.data && response.data.stocks) {
                    this.setState({
                        stocks: response.data.stocks,
                        minPrice: response.data.minPrice,
                        maxPrice: response.data.maxPrice,
                        avgPrice: response.data.avgPrice,
                        noStocks: response.data.stocks.length > 0 ? false : true,
                        spinner: false
                    });
                }
                else {
                    this.setState({
                        noStocks: true,
                        spinner: false
                    });
                }
            })
            .catch(e => {
                console.log(e);
                this.setState({
                    spinner: false
                });
            });
    };

    handleSelect(e) {
        let cCode = e.split(",")[0];
        let cName = e.split(",")[1];
        this.setState({
            code: cCode,
            name: cName
        });
    }

    onStartDateChange(e) {
        this.setState({
            startDate: e
        });
    }

    onEndDateChange(e) {
        this.setState({
            endDate: e
        });
    }

    render() {
        return (
            <div>
                <h2>View Stock List</h2>
                <Spinner animation="border" role="status" hidden={!this.state.spinner}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <div className="form-group">
                    <DropdownButton alignRight title="Select Company" id="companyCode" onSelect={this.handleSelect}>
                        {this.state.companies.map(item => (
                            <Dropdown.Item key={item.code} eventKey={item.code + "," + item.name}>{item.name}</Dropdown.Item>
                        ))
                        }
                    </DropdownButton>
                </div>
                <div className="form-group">
                    <label htmlFor="compCode">Company Code</label>
                    <input
                        id="compCode"
                        type="text"
                        className="form-control"
                        value={this.state.code}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="compName">Company Name</label>
                    <input
                        id="compName"
                        type="text"
                        className="form-control"
                        value={this.state.name}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="startDate">From: </label>
                    <DatePicker id="startDate" className="form-control" selected={this.state.startDate} onChange={this.onStartDateChange} />
                    <label htmlFor="endDate">To: </label>
                    <DatePicker id="endDate" className="form-control" minDate={this.state.startDate} selected={this.state.endDate} onChange={this.onEndDateChange} />
                </div>
                <div className="form-group">
                    <Button onClick={this.getStocks}>Search</Button>
                </div>
                {this.state.noStocks ? (
                    <h4>Nostock found for the Company!</h4>
                ) : (
                    <h4></h4>
                )}
                <div className="form-group">
                    <Container>
                        <Row>
                            <Col sm>Stock Price</Col>
                            <Col sm>Date</Col>
                            <Col sm>Time</Col>
                        </Row>
                        {this.state.stocks.map(item => (
                            <Row key={item.stockPrice}>
                                <Col lg>{item.stockPrice}</Col>
                                <Col lg>{item.stockDate}</Col>
                                <Col lg>{item.stockTime}</Col>
                            </Row>
                        ))
                        }
                    </Container>
                </div>
                <div className="form-group">
                    <Container>
                        <Row>
                            <Col sm>Min</Col>
                            <Col lg>{this.state.minPrice}</Col>
                        </Row>
                        <Row>
                            <Col sm>Max</Col>
                            <Col lg>{this.state.maxPrice}</Col>
                        </Row>
                        <Row >
                            <Col sm>Average</Col>
                            <Col lg>{this.state.avgPrice}</Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
};