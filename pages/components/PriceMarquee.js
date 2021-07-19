import React, { Fragment, useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import PriceFeedInstance from "../api/contracts/ChainlinkPriceFeed";
import { addressMappings } from "../api/utils/PriceMappings";
import useInterval from "../api/utils/useInterval";

const PriceMarquee = () => {
  const [marqueeContent, setMarqueeContent] = useState(null);

  const REFRESH_INTERVAL = 5000;
  useInterval(async () => {
    getPriceFeeds();
  }, REFRESH_INTERVAL);

  useEffect(() => {
    getPriceFeeds();
  }, []);

  const getPriceFeeds = async () => {
    const dataPromises = addressMappings.kovan.map(async (asset) => {
      try {
        let info = await PriceFeedInstance.methods
          .getLatestPrice(asset.address)
          .call();
        return {
          ...asset,
          decimals: info[2],
          price: info[0],
          roundID: info[1],
          description: info[3],
          error: false,
        };
      } catch {
        return { ...asset, price: "Unknown", error: true };
      }
    });

    const data = await Promise.allSettled(dataPromises).then(
      (resolvedPromises) => {
        return resolvedPromises.map((promise) => {
          return promise.value;
        });
      }
    );

    const createMarquee = () => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          {data.map((item) => {
            const price = item.price / 10 ** item.decimals;
            return (
              <Fragment key={item.address}>
                <div style={{ paddingLeft: "20px", color: "blue" }}>
                  {item.description || item.name}
                </div>
                <div style={{ paddingLeft: "10px", fontWeight: "bold" }}>
                  ${isNaN(price) ? " 🐕 🤷‍♀️ " : price.toFixed(4)}
                </div>
              </Fragment>
            );
          })}
        </div>
      );
    };

    setMarqueeContent(createMarquee);
  };

  return (
    <>
      {marqueeContent ? (
        <Marquee
          style={{
            height: "40px",
            borderTop: "1px solid lightgrey",
          }}
        >
          {marqueeContent}
        </Marquee>
      ) : null}
    </>
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
