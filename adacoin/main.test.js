const { Block, Chain } = require('./src/main.js');

describe('AdaCoin Initial Test Scenario', () => {
  test('Init Test', () => {
    let adacoin = new Chain();
    adacoin.addblock(new Block('1/1/2020', { amount: 10 }));
    adacoin.addblock(new Block('2/1/2020', { amount: 20 }));

  //  adacoin.chain[2].transaction = { amount: 10 };


    expect (adacoin.isvalid()).toBeTruthy();


  });
});