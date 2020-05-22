import React from 'react'
import axios from 'axios'

const GetCurrencyExchange = (props) => {
  axios.get('https://open.exchangerate-api.com/v6/latest')
    .then(res => {
      const rates = res.data.rates.props
    })
    .catch(error => {
      console.error(error)
    })
}

export default GetCurrencyExchange
