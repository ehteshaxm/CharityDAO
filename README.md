# Starting the App

After cloning do inside the directory
```
yarn install
```

```
cd ethereum
```
Change the phrase in provider wtih your metamask phrase and change infura link if you want 

```
node compile.js
```

```
node deploy.js
```

Copy the Hexadecimal number after deployment
```
Contract Deployed to 'hexadecimal number'
```

Paste the number in following file after Dao.abi parameter
```
src/eth/dao.js
```

If you changed the Infura link in deploy.js also change it in 
```
src/eth/web3.js
```

You are good to go
```
yarn start
```

