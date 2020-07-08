import React from 'react';
import VideoPlayer from './components/VideoPlayer';

const Main = () => {
  const vOptions = {
    width: 1280,
    height: 720,
    autoplay: true,
    controls: true,
    sources: [{
      src: process.env.STREAMURL,
      type: 'application/x-mpegURL'
    }]
  };

  return (
    <VideoPlayer {...vOptions} />
  );
};

export default Main;
