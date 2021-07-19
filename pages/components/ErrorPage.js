import React from "react";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

const ErrorPage = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <h3>Sorry - an error occurred!</h3>
      <button onClick={() => router.push("/")}>Go Home</button>
      <p>Try again or just enjoy this video!</p>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        // playing={true}
        // muted={true}
        controls={true}
      />
    </div>
  );
};

export default ErrorPage;
