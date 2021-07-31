import React, { Component } from "react";
import CompanyService from '../../services/company/company.service.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import "./CompanyStyles.css";

export default class CompanyList extends Component {
    constructor(props) {
        super(props);
        this.deleteCompany = this.deleteCompany.bind(this);
        this.state =
        {
            companies: [],
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
    }

    deleteCompany(companyCode) {
        console.log(companyCode)
        this.setState({
            spinner: true
        });
        CompanyService.deleteCompany(companyCode)
            .then(response => {
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
            })
            .catch(e => {
                console.log(e);
                this.setState({
                    spinner: false
                });
            });
    }

    render() {
        return (
            <div>
                <h2>View Company List</h2>
                <Spinner animation="border" role="status" hidden={!this.state.spinner}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <Container>
                    <Row>
                        <Col sm>Company Code</Col>
                        <Col sm>Company Name</Col>
                        <Col sm>CEO Name</Col>
                        <Col sm>TurnOver</Col>
                        <Col sm>Website</Col>
                        <Col sm>Stock Exchange</Col>
                        <Col sm>Latest Stock Price</Col>
                        <Col sm>Delete</Col>
                    </Row>
                    {this.state.companies.map(item => (
                        <Row key={item.code}>
                            <Col lg>{item.code}</Col>
                            <Col lg>{item.name}</Col>
                            <Col lg>{item.ceoName}</Col>
                            <Col lg>{item.turnOver}</Col>
                            <Col lg>{item.website}</Col>
                            <Col lg>{item.stockExchange}</Col>
                            <Col lg>{item.latestStockPrice}</Col>
                            <Col lg><Button variant="link" onClick={() => { this.deleteCompany(item.code) }} >Delete</Button></Col>
                        </Row>
                    ))
                    }
                </Container>
            </div>
        );
    }
};