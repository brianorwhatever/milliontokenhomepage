import React, { Component } from 'react'
import MillionTokenHomepageContract from '../build/contracts/MillionTokenHomepage.json'
import Web3 from 'web3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      bids: []
    }
  }

  componentWillMount() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    // So we can update state later.
    var self = this

    // Get the RPC provider and setup our SimpleStorage contract.
    const provider = new Web3.providers.HttpProvider('http://localhost:8545')
    const contract = require('truffle-contract')
    const millionTokenHomepage = contract(MillionTokenHomepageContract)
    millionTokenHomepage.setProvider(provider)

    // Get Web3 so we can get our accounts.
    const web3RPC = new Web3(provider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var millionTokenHomepageInstance

    // Get accounts.
    web3RPC.eth.getAccounts(function(error, accounts) {
      console.log(accounts)

      millionTokenHomepage.deployed().then(function(instance) {
        millionTokenHomepageInstance = instance

        // // Stores a value of 5.
        // return simpleStorageInstance.set(5, {from: accounts[0]})
        for(var i = 0; i < 1000; i++) {
          millionTokenHomepageInstance.getToken.call(i).then(function(i, result) {
            var newBids = self.state.bids;
            //console.log(result);
            newBids[i] = result[3].toNumber();
            self.setState({bids: newBids})
            console.log(newBids)
          }.bind(null, i))
        }
      })
        // return millionTokenHomepageInstance.bidOnToken(10, 10, 100, 100, 100, {from: accounts[0]})
      // }).then(function(result) {
      //   // Get the value from the contract to prove it worked.
      //   debugger;
      //   return millionTokenHomepageInstance.bidOnToken(10, 12, 100, 100, 100, {from: accounts[0]})
      // }).then(function(result) {
      //   // Update state with the result.
      //   // millionTokenHomepageInstance.tokens(10, )
      //   // .then(function (myStructArray) {
      //   //     assert.equal(myStructArray.length, 2, "should only have 2 fixed size values");
      //   // });
      //   return self.setState({ storageValue: result.c[0] })
      // })
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
            {/*}<ul className="pure-menu-list">
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">News</a></li>
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Sports</a></li>
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Finance</a></li>
            </ul>*/}
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <ul>
                {this.state.bids.map(function(bid, index) {
                  return <li>{bid}</li>
                })}
              </ul>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
