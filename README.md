## See this project live

[Live Kovan testnet version click here](https://chainlink-keepers.vercel.app/)

![Screen Shot 2021-07-20 at 1 08 25 am](https://user-images.githubusercontent.com/12529822/126182827-65c9d801-e597-450b-afbc-c3783ff99064.png)

## Details
This app builds and deploys 2 solidity contracts - one is used for the pricefeed ticker displayed at the bottom of the page. The other is a raffle 'lottery' (A raffle is a competition in which people buy tickets, each of which has the chance of winning a prize. At a set condition or time, the winner(s) are drawn at random).

The PriceFeed contract uses [Chainlink Price Feeds](https://docs.chain.link/docs/using-chainlink-reference-contracts/) to get the latest price of an asset.
The Raffle Contract uses [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) for a verifiably random winner draw. It also uses [Chainlink Keepers](https://docs.chain.link/docs/chainlink-keepers/introduction/) to tigger an automatic draw once a set number of players has been reached (default is 3).

The frontend uses Next JS, React and Web3 to interact with the blockchain contracts.

This project was built for a presentation so you can take a gander (look at) the presnetation slides used [here](https://docs.google.com/presentation/d/1lNE8R9CvSRomTGYS6cXjlLKhQviQxbrCVwVcDzQCxqc/edit?usp=sharing)

## **Framework**

**Contracts**: [Truffle](https://www.trufflesuite.com/truffle), Solidity, [Infura](https://infura.io/), [Metamask](https://docs.metamask.io/guide/), [Chainlink](https://docs.chain.link/docs)

**Front-end**: React, [Next](https://nextjs.org/) (routing, SSR), [Web3](https://web3js.readthedocs.io/en/v1.3.4/).

**Other npm libs**: @truffle/hdwallet-provider, dotenv

## **Requirements/Dependencies**
[Node js](https://nodejs.org/en/). 

[Infura Account](https://infura.io/register) => [Set up guide](https://blog.infura.io/getting-started-with-infura-28e41844cc89/). 

[Metamask Wallet](https://metamask.io/) => NB: USE A FRESH WALLET WITH NO REAL VALUABLE ASSETS ON IT (test only) AND KEEP YOUR SEED PHRASE HANDY (we need this to deploy the solidity contracts). 

[Truffle](https://www.trufflesuite.com/truffle) => install using npm command. 

> npm install -g truffle

Kovan Testnet Link & Eth Tokens 
[Faucet](https://linkfaucet.protofire.io/kovan)

## **Running the App**

1. Clone the repo `git clone https://github.com/DeveloperAlly/Chainlink-Keepers.git` - NB: USE THE DEVELOP BRANCH FOR TESTING > git checkout develop
2. Create a .env file `> touch .env`
3. Fill in the .env file with the Infura address and the Metamask seed phrase (as per the .example.env file)
4. Install dependencies `npm install`
5. Deploy the contracts `truffle migrate --network kovan`
7. Add the deployed contract addresses to the .env file
8. Add Link to the contract (to pay for VRF transactions) - 1 Link is enough for 10 rounds
9. Register the app for Chainlink Keepers [here](https://keeper.chain.link)
10. Install npm dependencies from the develop branch in root folder `npm install`
11. Run the front end from the develop branch in root folder `npm run dev`
12. Navigate to [http://localhost:3000](http://localhost:3000/) to see the app in action


## **To Do**

- Fix front end quirks
- Add Autofill of Link to the Keeper function (for both the Keeper upkeep and the VRF contract upkeep)
- Clear messages after time elapsed (would prefer a toast module tbh)



## Next.js documentation 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Making this project from Scratch

> npx creat-next-app
> cd [name of project]
> truffle init
> (contracts) npm install dotenv @truffle/hdwallet-provider @chainlink/contracts
> (frontend) npm install web3
> (testing) npm install mocha
> make .env file
> truffle.config setup
> Fund your wallet (contract deployer) with test eth and link (link to rinkeby and kovan faucets)
> create your contracts
> create your migration file in /migrations/2_deploy_migrations.js
> compile your contract > truffle compile
> Deploy your contracts > truffle migrate --network kovan
> Put deployed address in .env file
> Register with Chainlink Keeper Network (https://docs.chain.link/docs/chainlink-keepers/register-upkeep/)
> Frontend config web3 provider -> create web3.js under pages/api
> Create ChainlinkKeeper.js under pages/api

## Project Blogposts

1. Setting up a Solidity / React Project
2. Building & deploying the Contracts
3. Building & connecting the Front-end to the contracts
