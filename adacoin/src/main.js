const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(ts, transaction, phash) {
    this.ts = ts;
    this.transaction = transaction;
    this.phash = phash;

    this.hash = this.calculatehash();
  }
  calculatehash() {
    let hash = SHA256( this.ts + JSON.stringify(this.transaction) + this.phash );
    return hash.toString();
  }
}

class Chain {
  constructor() {
    this.chain = [ this.genesisblock() ];
  }

  genesisblock() {
    return new Block ('1/1/1970', 'Genesis Block', 0);
  }
  
  lastblock() {
    return this.chain[ this.chain.length -1 ];
  }

  addblock(newblock) {
    newblock.phash = this.lastblock().hash;
    newblock.hash = newblock.calculatehash();
    
    this.chain.push(newblock);
  }

  isvalid() {
    for( let b = 1; b < this.chain.length; b++ ) {
      const current = this.chain[ b ];
      const previous = this.chain[ b - 1 ];

      if( current.hash !== current.calculatehash() ) {
        return false;
      }

      if(current.phash !== previous.hash ) {
        return false;
      }

    }
    return true;
  }

  balance() {
    let currentamount = 0;
    if(this.isvalid()) {
      for( let i = 1; i < this.chain.length; i++) {
        currentamount += this.chain[i].transaction.amount;
      }
      
    }
    return currentamount;
  }

}

let adacoin = new Chain();
adacoin.addblock(new Block('1/1/2020', { amount: 100 }) );
adacoin.addblock(new Block('2/1/2020', { amount: 200 }) );
//adacoin.addblock(new Block('3/1/2020', { amount: 15 }) );
//console.log( adacoin.chain );

console.log("valid check: " + adacoin.isvalid());
console.log("balance: " + adacoin.balance());

//console.log( "lst: " + adacoin.isvalid() );

//adacoin.chain[2].transaction = { amount: 100 };

//console.log( "2nd: " + adacoin.isvalid() );
//*/

/*for( let i = 1; i < this.chain.length; i++ ) {
      const currentamount = this.chain[ i ].transaction;
      const previousamount = this.transaction.chain[ i - 1];

      const sumtransaction = currentamount + previousamount
 */

/*
let adacoin = new Block();
console.log( adacoin.calculatehash() );

let adachain = new Chain();
console.log( "d" + adachain.genesisblock() );
*/


module.exports = { Block, Chain };
