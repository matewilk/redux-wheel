import React from 'react';
import {Card, CardHeader, CardMedia, CardActions} from 'material-ui';

import Wheel from './Wheel';
import SectorForm from './SectorForm';
import BoardLink from './BoardLink';
import SectorDeleteModal from './SectorDeleteModal';

class MainCard extends React.Component {
  render () {
    return (
      <div>
        <Card style={{textAlign: 'initial'}}>
          <CardHeader
            title='Try your luck'
            subtitle='Spin the wheel'
          />
          <CardMedia style={{height: '50%', width: '50%', left: '25%'}}>
            <Wheel />
            <SectorForm />
            <BoardLink />
          </CardMedia>
          <CardActions />
        </Card>
        <SectorDeleteModal />
      </div>
    );
  }
}

export default MainCard;
