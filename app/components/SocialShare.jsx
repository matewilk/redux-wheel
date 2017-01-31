import React from 'react';
import { Dialog, RaisedButton, Subheader } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid/lib/index';
import ReactGA from 'react-ga';

import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

class SocialShare extends React.Component {
  constructor () {
    super();
  }

  componentDidMount () {
    window.twttr.ready((twtr) => {
      twtr.widgets.load()
    });
  }

  render () {
    const {
      TwitterShareButton
    } = ShareButtons;
    const TwitterIcon = generateShareIcon('twitter');

    let shareUrl = 'http://rinsify.com';
    let title = 'Spin up your addiction - ';
    return (
      <div>
        <div className='twitter-share-button-container'>
          <a
            href="https://twitter.com/share"
            className="twitter-share-button"
            data-show-count="false"
          >
            Tweet
          </a>
        </div>
        <div style={{position: 'absolute', right: '16px'}}>
          <a
            href="https://twitter.com/rinsify"
            className="twitter-follow-button"
            data-show-count="false"
          >
            Follow @rinsify
          </a>
        </div>
      </div>
    );
  }
}

export default SocialShare;
