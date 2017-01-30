import React from 'react';
import { Dialog, RaisedButton } from 'material-ui';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';

class AlertModal extends React.Component {
  constructor () {
    super();

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose () {
    ReactGA.event({
      category: 'AlertModal',
      action: 'Dismiss'
    });

    this.props.dispatch({
      type: 'modal.alertModalToggle',
      message: ''
    });
  }

  render () {
    const actions = [
      <RaisedButton
        label='OK'
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <Dialog
        title='Oops'
        actions={actions}
        modal={true}
        open={this.props.modal.alert.open}
      >
      {this.props.modal.alert.message}
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
export default connect(mapStateToProps)(AlertModal);
