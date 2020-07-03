import React, { Component } from 'react';
import moment from 'moment';
import { Dimmer, Loader, Form } from 'semantic-ui-react';

const currencyOptions = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CHF', 'CNY', 'HKD', 'MXN', 'INR'];

const fromCurrencyOptions = [
    { key: 'USD', text: 'USD', value: 'USD' },
    { key: 'EUR', text: 'EUR', value: 'EUR' },
    { key: 'JPY', text: 'JPY', value: 'JPY' },
    { key: 'GBP', text: 'GBP', value: 'GBP' },
    { key: 'AUD', text: 'AUD', value: 'AUD' },
    { key: 'CHF', text: 'CHF', value: 'CHF' },
    { key: 'CNY', text: 'CNY', value: 'CNY' },
    { key: 'HKD', text: 'HKD', value: 'HKD' },
    { key: 'MXN', text: 'MXN', value: 'MXN' },
    { key: 'INR', text: 'INR', value: 'INR' },
  ] 

const toCurrencyOptions = [
    { key: 'CAD', text: 'CAD', value: 'CAD' },
]

class CurrencyConvertor extends Component {
    state = {
        isLoading: false,
        date: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        fromCurrencySelect: 'USD',
        toCurrencySelect: '',
        fromCurrency: '',
        toCurrency: '',
        exchangeRate: '',
        number: 1,
        numberInFromCurrency: true
    }

    fetchExchangeRate = async() => {
        this.setState({isLoading: true})
        const res = await fetch(`http://127.0.0.1:8001/api/v1/exchangeRates/${this.state.fromCurrencySelect}`);
        const data = await res.json();
        if(data.resultLength === 0){
            alert('No exchange Rate on this day!')
        }
        this.setState({
            exchangeRate: data.exchangeRate,
            isLoading: false
        })
    }

    fetchExchangeRateWithDate = async() => {
        const {date, fromCurrencySelect} = this.state
        this.setState({isLoading: true})
        const res = await fetch(`http://127.0.0.1:8001/api/v1/exchangeRatesWithdate?date=${date}&currencyCode=${fromCurrencySelect}`)
        const data = await res.json();
        if(data.resultLength === 0){
            alert('No exchange Rate on this day!')
        }
        this.setState({
            exchangeRate: data.exchangeRate,
            isLoading: false
        })
    }

    componentDidMount = () => {
        this.fetchExchangeRate();
    }  

    componentDidUpdate = async(prevProps, prevState) => {
        if(prevState.date !== this.state.date){
            this.fetchExchangeRateWithDate();
        }
        if(prevState.fromCurrencySelect !== this.state.fromCurrencySelect){
           this.fetchExchangeRateWithDate();
        }
    } 

    handleOnChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };

    handleCurrencyNumber = (e) => {
        if(e.target.name === 'fromCurrency'){
            this.setState({
                number: e.target.value,
                numberInFromCurrency: true
            })
        }else if(e.target.name === 'toCurrency'){
            this.setState({
                number: e.target.value,
                numberInFromCurrency: false
            })
        }
    }

    handleOnSelect = (value, key) => {
        this.setState({ [key]: value });
      };

    render() {
        let fromCurrencyNumber, toCurrencyNumber;
        const { 
            date,
            isLoading,
            number, 
            numberInFromCurrency, 
            exchangeRate 
        } = this.state;

        if(numberInFromCurrency){
            fromCurrencyNumber = number;
            toCurrencyNumber = (number / exchangeRate).toFixed(4);
        }else{
            toCurrencyNumber = number;
            fromCurrencyNumber = (toCurrencyNumber * exchangeRate).toFixed(4);
        }

        return (
            <div>
                <h1>Currency Convertor</h1>
                {isLoading && <Dimmer active inverted>
                    <Loader>Loading</Loader>
                </Dimmer>}
                <Form>
                    <Form.Group widths={4}>
                        <Form.Input
                            fluid
                            type="date"
                            label="Date"
                            name="date"
                            value={date}
                            onChange={this.handleOnChange}
                        />
                    </Form.Group>
                    <Form.Group widths={4}>
                        <Form.Input
                            fluid
                            type='number' 
                            label="Amount of Foreign Currency"
                            name='fromCurrency' 
                            value={fromCurrencyNumber} 
                            onChange={this.handleCurrencyNumber}
                        />
                        <Form.Select
                            fluid
                            label='Currencies'
                            options={fromCurrencyOptions}
                            placeholder='USD'
                            width={2}
                            name='fromCurrencySelect' 
                            onChange={(e, { value }) => this.handleOnSelect(value, "fromCurrencySelect")}
                        />
                    </Form.Group>
                    <Form.Group widths={4}>
                        <Form.Input
                            fluid
                            label='Amount of Canadian Dollars'
                            type='number' 
                            name='toCurrency' 
                            value={toCurrencyNumber} 
                            onChange={this.handleCurrencyNumber}
                        />
                        <Form.Select
                            fluid
                            label='Canadian Dollar'
                            options={toCurrencyOptions}
                            placeholder='CAD'
                            name='toCurrencySelect' 
                            onChange={this.handleOnChange}
                            width={2}
                        />
                    </Form.Group>
                </Form>
                <div>
                    <p>The exchange rate is: <strong>{exchangeRate}</strong></p>
                </div>
                </div>
        )
    }
};

export default CurrencyConvertor;
