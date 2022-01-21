const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const daoPath = path.resolve(__dirname, 'contracts', 'CharityDAO.sol');
const source = fs.readFileSync(daoPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {},
  settings: {
    metadata: {
      useLiteralContent: true,
    },
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

input.sources['CharityDAO.sol'] = {
  content: source,
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contracts = output.contracts['CharityDAO.sol'];

fs.ensureDirSync(buildPath);

for (let contract in contracts) {
  if (contracts.hasOwnProperty(contract)) {
    fs.outputJsonSync(
      path.resolve(buildPath, `${contract}.json`),
      contracts[contract]
    );
  }
}
