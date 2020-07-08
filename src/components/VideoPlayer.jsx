/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-return-assign */
import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, () => {
      // called when player is ready
      // console.log('onPlayerReady', this);
    });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <div>
        <div data-vjs-player>
          <video ref={(node) => this.videoNode = node} className="video-js" />
        </div>
      </div>
    );
  }
}
