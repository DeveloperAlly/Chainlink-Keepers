import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
// import PriceFeedInstance from "../api/contracts/ChainlinkPriceFeed";

const PriceMarquee = () => {
  const [priceData, setPriceData] = useState();

  useEffect(() => {}, []);

  //   const getPriceFeeds = async () => {
  //     const dataPromises = addressMappings.rinkeby.map(async (asset) => {
  //       try {
  //         let info = await ChainlinkPriceFeed.methods
  //           .getLatestPrice(asset.address)
  //           .call();
  //         let { decimals, price, description, roundID } = info;
  //         return {
  //           ...asset,
  //           decimals,
  //           price,
  //           roundID,
  //           description,
  //           error: false,
  //         };
  //       } catch {
  //         return { ...asset, price: "Unknown", error: true };
  //       }
  //     });

  //     const data = await Promise.allSettled(dataPromises).then(
  //       (resolvedPromises) => {
  //         return resolvedPromises.map((promise) => {
  //           return promise.value;
  //         });
  //       }
  //     );
  //   };

  return (
    <Marquee
      style={{
        height: "40px",
        borderTop: "1px solid lightgrey",
        padding: "5px 0",
      }}
    >
      <p>My scrolling price feed</p>
    </Marquee>
  );
};

export default PriceMarquee;

//   const dataPromises = addressMappings.rinkeby.map(async (asset) => {
//     try {
//       let info = await ChainlinkPriceFeed.methods
//         .getLatestPrice(asset.address)
//         .call();
//       let { decimals, price, description, roundID } = info;
//       return {
//         ...asset,
//         decimals,
//         price,
//         roundID,
//         description,
//         error: false,
//       };
//     } catch {
//       return { ...asset, price: "Unknown", error: true };
//     }
//   });

//   const data = await Promise.allSettled(dataPromises).then(
//     (resolvedPromises) => {
//       return resolvedPromises.map((promise) => {
//         return promise.value;
//       });
//     }
//   );
