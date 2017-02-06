import React from 'react';
import { Dialog, RaisedButton } from 'material-ui';
import { Divider, ListItem } from 'material-ui';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';

class WelcomeDialog extends React.Component {
  constructor () {
    super();

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose () {
    ReactGA.event({
      category: 'WelcomeDialog',
      action: 'Dismiss'
    });

    this.props.dispatch({
      type: 'modal.welcomeDialogToggle'
    });
  }

  render () {
    const actions = [
      <RaisedButton
        label="Let's Play!"
        primary={true}
        onTouchTap={this.handleClose}
      ></RaisedButton>
    ];

    return (
      <Dialog
        title={
          <div>
          <div>Welcom to rinsify (beta version)</div>
          <div style={{color: 'rgba(0, 0, 0, 0.6)', fontSize: '0.75em'}} className='xs-hide'>
            rinsify is a free online rinsing game made in contribution to FemDom community.
          </div>
          </div>
        }
        actions={actions}
        modal={false}
        autoScrollBodyContent={true}
        onRequestClose={this.handleClose}
        open={this.props.modal.welcome.open}
      >
        <Divider />
        <ListItem>Set up your wheel of (miss)fortune</ListItem>
        <Divider />
        <ListItem>Copy the link to your wheel by clicking Copy button at the bottom of the page</ListItem>
        <Divider />
        <ListItem>Share the link with whom you want to start the #rinsinggame</ListItem>
        <Divider />
        <ListItem>Play on any device, mobile, tablet, PC or TV</ListItem>
        <Divider />
        <ListItem>Rinse or be rinsed!</ListItem>
        <Divider />
        <ListItem style={{fontSize: '0.75em'}}>
          This is a beta version, if you minimise the browser window or switch between tabs while the wheel is spinning,
          it can get out of sync with other players. If it was the case, simply refresh the page.
        </ListItem>
      </Dialog>
    );
  }
}

// export the connected class
function mapStateToProps (state) {
  return ({
    modal: state.modal
  });
}
export default connect(mapStateToProps)(WelcomeDialog);
