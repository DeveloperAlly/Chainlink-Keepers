## See this project live

[Live version](https://chainlink-keepers.vercel.app/)

## Project dependencies

Install Truffle globally
Install Node
Create an Infura Account & Project
Install Metamask & fund with test ETH & LINK (Kovan network)

## Project framework

Chainlink VRF and Chainlink Keepers
Next.js & react frontend

## Dependencies

dotenv
chainlink

## Making this project

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

## Running this project

install dependencies > npm install

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

## Project Blogposts

1. Setting up a Solidity / React Project
2. Building & deploying the Contracts
3. Building & connecting the Front-end to the contracts
