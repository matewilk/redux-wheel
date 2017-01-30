import React from 'react';
import {Card, CardHeader, CardMedia, CardActions} from 'material-ui';

import Wheel from './Wheel';
import SectorForm from './SectorForm';
import BoardLink from './BoardLink';
import SectorDeleteModal from './SectorDeleteModal';
import AlertModal from './AlertModal';
import SocialShare from './SocialShare';

class MainCard extends React.Component {
  render () {
    return (
      <div>
        <Card style={{textAlign: 'initial'}} className='glamorous-card'>
          <CardHeader
            title='Spin'
            subtitle='try your luck'
          >
            <SocialShare />
          </CardHeader>
          <CardMedia className='main-card-media'>
            <Wheel />
            <SectorForm />
            <BoardLink />
          </CardMedia>
          <CardActions />
        </Card>
        <SectorDeleteModal />
        <AlertModal />
      </div>
    );
  }
}

export default MainCard;
