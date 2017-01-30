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

  render () {
    const {
      TwitterShareButton
    } = ShareButtons;
    const TwitterIcon = generateShareIcon('twitter');

    let shareUrl = 'http://rinsify.com';
    let title = 'Spin up your addiction - ';
    return (
      <div className='twitter-share-button-container'>
        <div className='share-text'>
          <Subheader >share</Subheader>
        </div>
        <TwitterShareButton
          url={shareUrl}
          title={title}
          hashtags={['test', 'test2']}>
          <TwitterIcon
            size={32}
            round />
        </TwitterShareButton>
      </div>
    );
  }
}

export default SocialShare;
