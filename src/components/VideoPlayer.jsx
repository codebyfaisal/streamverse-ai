import React from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

const VideoPlayer = ({ src, poster, autoplay = false }) => {
  return (
    <div className="aspect-video w-full">
      <MediaPlayer
        title="Stream verse"
        src="https://files.vidstack.io/sprite-fight/720p.mp4"
      >
        <MediaProvider />
        <DefaultVideoLayout
          thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
          icons={defaultLayoutIcons}
        />
      </MediaPlayer>
    </div>
  );
};

export default VideoPlayer;
