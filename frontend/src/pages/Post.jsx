import Navbar from "../components/test/Navbar";
import PostDetails from "../components/post-details/PostDetails";
import styles from "./Post.module.css";
import Comments from "../components/post-details/Comments";
import { useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import FileRobot from "../components/test/Filerobot";
import { useScreenshot } from "use-react-screenshot";

const Post = () => {
  const { state } = useLocation();

  //screenshot
  const videoPlayerRef = useRef(null);
  const [image, takeScreenshot] = useScreenshot({
    type: "image/png",
    quality: 1.0,
  });
  const getImage = () => takeScreenshot(videoPlayerRef.current);
  //

  let renderMedia = "";
  if (state.contentType.includes("image")) {
    renderMedia = (
      <div>
        <img src={state.url}></img>
        <FileRobot url={state.url} type="image" buttonText="Edit Image" />
      </div>
    );
  } else {
    renderMedia = (
      <div>
        <video
          ref={videoPlayerRef}
          src={state.url}
          crossOrigin="anonymous"
          width="80%"
          height="80%"
          controls
        ></video>
        <FileRobot
          screenshot={getImage}
          url={image}
          buttonText="Take Screenshot"
          type="video"
        />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.layout}>
        {renderMedia}
        <div>
          <PostDetails data={state} />
        </div>
        <div className={styles.comments}>
          <Comments />
        </div>
      </div>
    </>
  );
};

export default Post;
