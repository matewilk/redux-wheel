import React from 'react';
import { Dialog, RaisedButton } from 'material-ui';
import { TextField, Divider } from 'material-ui';
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
      type: 'modal.welcomeDialogToggle',
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
        title='Welcom to rinsify (beta version)'
        actions={actions}
        modal={false}
        open={this.props.modal.welcome.open}
      >
        <div>rinsify is a free online rinsing game made in contribution to FemDom community.</div>
        <TextField
          hintText=""
          underlineShow={false}
          disabled={true}
          fullWidth={true} />
        <Divider />
        <TextField
          hintText="Set up your wheel of (miss)fortune"
          underlineShow={false}
          disabled={true}
          fullWidth={true} />
        <Divider />
        <TextField
          hintText="Copy the link to your wheel by clicking Copy button at the bottom of the page"
          underlineShow={false}
          disabled={true}
          fullWidth={true} />
        <Divider />
        <TextField
          hintText="Share the link with whom you want to start the #rinsinggame"
          underlineShow={false}
          disabled={true}
          fullWidth={true} />
        <Divider />
        <TextField
          hintText="Rinse or be rinsed!"
          underlineShow={false}
          disabled={true}
          fullWidth={true} />
        <Divider />
        <TextField
          hintText=""
          underlineShow={false}
          disabled={true}
          fullWidth={true} />
        <TextField
            style={{"fontSize": '0.75em'}}
            hintText="This is a beta version, if you minimise the browser window or switch between tabs while the wheel is spinning,
              it can get out of sync with other players. In that case, simply refresh the page."
            underlineShow={false}
            disabled={true}
            fullWidth={true} />
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
