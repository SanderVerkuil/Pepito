#!/usr/bin/env node

const send = require('./pepito').default;
const { createAccount } = require('@iota/account');
const { serializeCDAMagnet } = require('@iota/cda');

const targetSeed = 'LDLHUQKXRUYCXEJ9FCJDHFPEDQDELBNGMPTGJ9SAJAAXNVKWCX9KTGXBIFMBBLOQIVYXPVOVKUFFBECJL'

const provider = 'https://nodes.devnet.iota.org:443'

const targetAccount = createAccount({
    seed: targetSeed, provider
});

targetAccount.generateCDA({
    timeoutAt: Date.now() + 3600 * 1000,
    multiUse: true
})
    .then(cda => {
        const magnet = serializeCDAMagnet(cda);
        console.log('Specified magnet link', magnet);
        send(magnet, 120);
    })
