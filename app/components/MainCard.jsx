import React from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardMedia, CardActions } from 'material-ui';
import { FloatingActionButton } from 'material-ui';
import HelpOutline from 'material-ui/svg-icons/action/help-outline'
import ReactGA from 'react-ga';

import Wheel from './Wheel';
import SectorForm from './SectorForm';
import BoardLink from './BoardLink';
import SectorDeleteModal from './SectorDeleteModal';
import AlertModal from './AlertModal';
import WelcomeDialog from './WelcomeDialog';
import SocialShare from './SocialShare';

class MainCard extends React.Component {
  constructor () {
    super();

    this.showWelcomeDialog = this.showWelcomeDialog.bind(this);
  }

  showWelcomeDialog () {
    ReactGA.event({
      category: 'MainCard',
      action: 'showWelcomeDialog'
    });

    this.props.dispatch({
      type: 'modal.welcomeDialogToggle'
    });
  }

  render () {
    return (
      <div>
        <Card style={{textAlign: 'initial'}} className='glamorous-card'>
          <CardHeader
            title='Rinsify'
            subtitle='Spin up the addiction'
          >
            <SocialShare />
          </CardHeader>
          <CardMedia className='main-card-media'>
            <Wheel />
            <SectorForm />
            <BoardLink />
          </CardMedia>
          <CardActions>
            <FloatingActionButton mini={true} onTouchTap={this.showWelcomeDialog}>
              <HelpOutline />
            </FloatingActionButton>
          </CardActions>
        </Card>
        <SectorDeleteModal />
        <AlertModal />
        <WelcomeDialog />
      </div>
    );
  }
}

export default connect()(MainCard);
