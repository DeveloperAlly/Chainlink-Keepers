import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Image from "next/image";
import Head from "next/head";
import Marquee from "react-fast-marquee";
import styles from "../../styles/Home.module.css";
import { Transition, Header, Image as SImage } from "semantic-ui-react";
import RaffleInfo from "./Raffle/RaffleInfo";

//Hosts the top level layout of our app & also handles wallet connection.
// const Layout = ({ walletConnected, ...props }) => {
const Layout = (props, { data }) => {
  console.log("layout", props);
  return (
    <div className={styles.container}>
      <Head>
        <title>Chainlink Raffle</title>
        <meta name="description" content="Blockchain Trustless Raffle App" />
        <link rel="icon" href="/chainlink-logo.png" />
      </Head>
      <main className={styles.main}>
        <Container fluid style={{ paddingTop: "30px" }}>
          {/* <Header walletConnected={walletConnected} /> */}
          {/* <Header size="large" fluid /> */}
          <Header as="h1" icon textAlign="center">
            {/* put transition on a loop */}
            <Transition animation="tada" duration="1500" transitionOnMount>
              <SImage src="/chainlink-logo.png" />
            </Transition>
            <Header.Content style={{ paddingTop: "20px" }}>
              Chainlink Raffle
            </Header.Content>
          </Header>
          {props.children}
        </Container>
      </main>
      <Marquee
        style={{
          height: "40px",
          borderTop: "1px solid lightgrey",
          padding: "5px 0",
          position: "initial",
        }}
      >
        <p>My scrolling price feed</p>
      </Marquee>
      <footer className={styles.footer}>
        <a
          href="https://docs.chain.link/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>
            <Image
              src="/PoweredByChainlinkBlue.svg"
              alt="Powered By Chainlink Logo"
              width={300}
              height={40}
            />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Layout;
