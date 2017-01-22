import React from 'react';
import { Dialog, RaisedButton } from 'material-ui';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';

class DeleteModal extends React.Component {
  constructor () {
    super();

    this.handleClose = this.handleClose.bind(this);
    this.removeSector = this.removeSector.bind(this);
  }

  handleClose () {
    ReactGA.event({
      category: 'DeleteSectorModel',
      action: 'Dismiss'
    });

    this.props.dispatch({
      type: 'modal.modalDeleteToggle'
    });
  }

  removeSector () {
    ReactGA.event({
      category: 'DeleteSectorModel',
      action: 'Confirm Remove'
    });

    this.props.dispatch({
      type: 'sectors.removeSector',
      sectors: this.props.sectors
    });
    this.props.dispatch({
      type: 'modal.modalDeleteToggle'
    });
    this.props.dispatch({
      type: 'form.valueChange',
      value: ''
    });
  }

  render () {
    const actions = [
      <RaisedButton
        label='Cancel'
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <RaisedButton
        label='Submit'
        keyboardFocused={true}
        secondary={true}
        onTouchTap={this.removeSector}
      />
    ];

    return (
      <Dialog
        title='Delete section'
        actions={actions}
        modal={true}
        open={this.props.modal.open}
      >
      Are you sure you want to delete the section ?
      </Dialog>
    );
  }
}

// export the connected class
function mapStateToProps (state) {
  return ({
    sectors: state.sectors,
    modal: state.modal
  });
}
export default connect(mapStateToProps)(DeleteModal);
