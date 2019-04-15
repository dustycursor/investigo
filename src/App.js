import React, { Component } from 'react';
import Papa from 'papaparse';

import './App.css';

const inputIsFromBankOfAmerica = input => {
  input = input.split('\n');

  if (input.length > 8 && input[0].trim() === 'Description,,Summary Amt.' && input[6].trim() === 'Date,Description,Amount,Running Bal.') {
    let header = Papa.parse(input.splice(0, 6).join('\n'), {header: true});
    console.log(header);
    return header.data[0]['Description'].startsWith('Beginning balance as of')
      && header.data[1]['Description'] === 'Total credits'
      && header.data[2]['Description'] === 'Total debits'
      && header.data[3]['Description'].startsWith('Ending balance as of');
  }

  return false;
}

const parseBankOfAmericaInput = input => {
  input = input.split('\n').splice(6).join('\n');
  return Papa.parse(input, {header: true});
}

const inputIsFromCiti = input => {
  input = input.split('\n');
  return input.length > 1 && input[0].trim() === 'Status,Date,Description,Debit,Credit,Member Name';
}

const parseCitiInput = input => {
  return Papa.parse(input, {header: true});
}

class App extends Component {
  state = {data: ''};

  onChange = event => {
    let input = event.target.value;
    if (inputIsFromBankOfAmerica(input)) {
      console.log('Found Bank of America Input');
      console.log(parseBankOfAmericaInput(input));
    }
    if (inputIsFromCiti(input)) {
      console.log('Found Citi Input');
      console.log(parseCitiInput(input));
    }
    this.setState({data: input});
  }

  render() {
    return (
      <div>
        <div>
          <textarea cols="150" rows="30" onChange={this.onChange}></textarea>
        </div>
        <hr />
        <pre>
          {this.state.data}
        </pre>
      </div>
    );
  }
}

export default App;
