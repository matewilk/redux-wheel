import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid/lib/index';
import { TextField, RaisedButton } from 'material-ui';
import ReactGA from 'react-ga';

class SectorForm extends React.Component {
  constructor (props) {
    super(props);

    this.modalDeleteShow = this.modalDeleteShow.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.addSector = this.addSector.bind(this);
    this.editSector = this.editSector.bind(this);
    this.isWheelInMotion = this.isWheelInMotion.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
  }

  modalDeleteShow () {
    ReactGA.event({
      category: 'SectorForm',
      action: 'Remove'
    });

    this.props.dispatch({
      type: 'modal.modalDeleteToggle'
    });
  }

  isSectorSelected () {
    return this.props.sectors.some((sector) => {
      return sector.selected === true;
    });
  }

  isWheelInMotion () {
    return this.props.spinning.inMotion;
  }

  sectorsValidation () {
    let isValid = true;
    if (this.props.sectors.length >= 10) {
      isValid = false;

      this.props.dispatch({
        type: 'modal.alertModalToggle',
        message: `Sorry, only 10 sectors allowed in this version.
          You can still remove or edit existing sectors.`
      });
    }

    return isValid;
  }

  formValidation () {
    let maxLength = 30;
    let value = this.props.form.value;
    let error = '';

    if (value.length > maxLength) {
      error = `Maximum input length is 30 characters (currently ${value.length})`;
    } else if (!(/^(\s*|[a-zA-Z0-9 _-]+)$/.test(value))) {
      error = 'Must NOT contain special characters';
    } else if (/\s\s/.test(value)) {
      error = 'Must NOT containt multiple white spaces';
    }

    return error;
  }

  onValueChange (element, value) {
    this.props.dispatch({
      type: 'form.valueChange',
      value: value
    });
  }

  addSector () {
    ReactGA.event({
      category: 'SectorForm',
      action: 'Add',
      value: parseInt(this.props.form.value)
    });

    if (this.sectorsValidation()) {
      this.props.dispatch({
        type: 'sectors.addSector',
        value: this.props.form.value,
        sectors: this.props.sectors
      });
    }

    this.props.dispatch({
      type: 'form.valueChange',
      value: ''
    });
  }

  editSector () {
    ReactGA.event({
      category: 'SectorForm',
      action: 'Edit',
      value: parseInt(this.props.form.value)
    });

    this.props.dispatch({
      type: 'sectors.editSector',
      value: this.props.form.value,
      sectors: this.props.sectors
    });
    this.props.dispatch({
      type: 'form.valueChange',
      value: ''
    });
    this.props.dispatch({
      type: 'sectors.selectSector',
      id: null
    });
  }

  render () {
    let value = this.props.form.value;
    let selected = this.isSectorSelected();
    let wheelInMotion = this.isWheelInMotion();
    let error = this.formValidation();

    let AddButton = <RaisedButton
      label='Add'
      fullWidth={true}
      primary={true}
      disabled={value === '' || wheelInMotion || error !== ''}
      onTouchTap={this.addSector}
    />;
    let EditButton = <RaisedButton
      label='Update'
      fullWidth={true}
      onTouchTap={this.editSector}
      disabled={value === '' || wheelInMotion}
    />;

    let actionButton = selected ? EditButton : AddButton;
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          fullWidth={true}
          hintText='50'
          value={value}
          floatingLabelText='Amount'
          onChange={this.onValueChange}
          disabled={wheelInMotion}
          errorText={error}
        />
        <Row between='xs' style={{width: 'none', maxWidth: 'none'}}>
          <Col xs={6}>
            {actionButton}
          </Col>
          <Col xs={6}>
            <RaisedButton
              label='Remove'
              fullWidth={true}
              secondary={true}
              onTouchTap={this.modalDeleteShow}
              disabled={!selected || wheelInMotion}
            />
          </Col>
        </Row>
      </form>
    );
  }
}

// export the connected class
function mapStateToProps (state) {
  return ({
    form: state.form,
    sectors: state.sectors,
    spinning: state.spinning
  });
}
export default connect(mapStateToProps)(SectorForm);
