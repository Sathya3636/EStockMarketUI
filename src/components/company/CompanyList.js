import React, { Component } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import CompanyService from '../../services/company/company.service.js';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import paginationFactory from 'react-bootstrap-table2-paginator';

export default class CompanyList extends Component {
    constructor(props) {
        super(props);
        this.deleteCompany = this.deleteCompany.bind(this);
        this.state =
        {
            companies: [],
            columns: [{
                dataField: 'code',
                text: 'Company Code'
            },
            {
                dataField: 'name',
                text: 'Company Name'
            }, {
                dataField: 'ceoName',
                text: 'CEO Name'
            },
            {
                dataField: 'turnOver',
                text: 'TurnOver'
            },
            {
                dataField: 'website',
                text: 'Website'
            },
            {
                dataField: 'stockExchange',
                text: 'Stock Exchange'
            },
            {
                dataField: 'latestStockPrice',
                text: 'Latest Stock Price'
            },
            {
                dataField: 'button',
                text: '',
                formatter: this.linkDelete,
            }],
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

    componentDidUpdate(prevProps, nextProps) {
        if (prevProps !== this.props) {
            console.log(nextProps);
            this.setState({
                companies: nextProps.companies
            });
        }
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

    linkDelete = (cell, row, rowIndex, formatExtraData) => {
        return (
            <Button onClick={() => { this.deleteCompany(row.code); }}>Delete</Button>
        );
    };

    render() {
        return (
            <div>
                <h2>View Company List</h2>
                <Spinner animation="border" role="status" hidden={!this.state.spinner}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <BootstrapTable keyField='code'
                    striped
                    hover
                    columns={this.state.columns}
                    data={this.state.companies}
                    pagination={paginationFactory()} >
                </BootstrapTable>
            </div>
        );
    }
};