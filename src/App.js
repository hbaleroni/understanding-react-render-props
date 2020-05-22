import React, { Component } from 'react'
import axios from 'axios'

const App = () => (
  <div>    
    <h4>Render Prop</h4>
    <Amount
      render={(amount, exchange) => (
        <div>
          <Euro exchange={exchange[0].eurExchange} amount={amount} />
          <Pound exchange={exchange[1].gbpExchange} amount={amount} />
          <Real exchange={exchange[2].brlExchange} amount={amount} />
        </div>
      )} />
      <hr/>
  </div>
)

class Amount extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rates: [
        {eurExchange: 0},
        {gbpExchange: 0},
        {brlExchange: 0},
      ],
      amount: 0,
    }
  }

  componentDidMount() {
    axios.get('https://open.exchangerate-api.com/v6/latest')
    .then(res => {
      this.setState(
        {rates: [
          {eurExchange: res.data.rates.EUR},
          {gbpExchange: res.data.rates.GBP},
          {brlExchange: res.data.rates.BRL},
        ]}
      )
      // console.log(res.data.rates)
    })
    .catch(error => {
      console.error(error)
    })
  }

  onChange = (event) => {
    this.setState({ amount: parseInt(event.target.value) })
  }

  onIncrease = () => {
    this.setState(state => ({ amount: state.amount + 1}))
  }

  onDecrease = () => {
    this.setState(state => ({ amount: state.amount - 1}))
  }

  onReset = () => {
    this.setState(state => ({ amount: 0}))
  }

  render() {
    return (
      <div>
        <span>USD: {this.state.amount} </span>
        <input 
          type="number"
          onChange={this.onChange} 
          value={this.state.amount < 0 ? 0 : this.state.amount} placeholder={0} />
        <button type="button" onClick={this.onIncrease}>
          +
        </button>
        <button type="button" onClick={this.onDecrease}>
          -
        </button>
        <button type="button" onClick={this.onReset}>
          clear
        </button>
        <br />
        {this.props.render(this.state.amount, this.state.rates)}

        <p>Powered by <a href="https://www.exchangerate-api.com">ExchangeRate-API.com</a></p>
      </div>
    )
  }
}

const Euro = ({ exchange, amount }) => <p>EUR: {exchange * amount}</p>;
const Pound = ({ exchange, amount }) => <p>GBP: {exchange * amount}</p>;
const Real = ({ exchange, amount }) => <p>BRL: {exchange * amount}</p>;

export default App