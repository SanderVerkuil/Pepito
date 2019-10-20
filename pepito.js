const Iota = require('@iota/core');
const Sign = require('@iota/signing');
const Converter = require('@iota/converter');
const { createAccount } = require('@iota/account');
const { parseCDAMagnet } = require('@iota/cda');

const seed = 'DQLMLJZGLOOJN9XDPAJPSKBBTZOAFELCQIVLTKNITULBNCRBPZINDTIBTYXHFJUPBSC9EJXTHPETHZAGP';

const provider = 'https://nodes.devnet.iota.org:443';

const account = createAccount({
    seed, provider
});

// iota://9YDL9GNKTPRZNQPADINAUEWIQGTZYOEXNIOWPZHJIVXAYTN9TDDQMNMQUSGYDLAEXNIOIGAGZJAXTJJJ9ZCPWYDWDG/?timeout_at=1571568930076&multi_use=1

function send(magnet, amount) {
    account.getAvailableBalance().then(balance => console.log('Holder balance: ', balance))

    const { address, timeoutAt, multiUse, expectedAmount } = parseCDAMagnet(magnet);

    account.sendToCDA({
        address,
        timeoutAt,
        multiUse,
        expectedAmount,
        value: amount
    })
        .then(trytes => {
            console.log('Successfully prepared the transaction:', trytes)
        })
        .catch(err => {
            console.warn(err);
        })
}

module.exports.default = send;