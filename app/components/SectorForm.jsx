import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid/lib/index';
import { TextField, RaisedButton } from 'material-ui';

class SectorForm extends React.Component {
  constructor (props) {
    super(props);
    this.modalDeleteShow = this.modalDeleteShow.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.addSector = this.addSector.bind(this);
    this.editSector = this.editSector.bind(this);
    this.isWheelInMotion = this.isWheelInMotion.bind(this);
  }

  modalDeleteShow (event) {
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

  onValueChange (element, value) {
    this.props.dispatch({
      type: 'form.valueChange',
      value: value
    });
  }

  addSector () {
    this.props.dispatch({
      type: 'sectors.addSector',
      value: this.props.form.value,
      sectors: this.props.sectors
    });
    this.props.dispatch({
      type: 'form.valueChange',
      value: ''
    });
  }

  editSector () {
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
    let selected = this.isSectorSelected();
    let wheelInMotion = this.isWheelInMotion();

    let AddButton = <RaisedButton
      label='Add'
      fullWidth={true}
      primary={true}
      disabled={this.props.form.value === '' || wheelInMotion}
      onTouchTap={this.addSector}
    />;
    let EditButton = <RaisedButton
      label='Update'
      fullWidth={true}
      onTouchTap={this.editSector}
      disabled={wheelInMotion}
    />;

    let actionButton = selected ? EditButton : AddButton;
    return (
      <form>
        <TextField
          fullWidth={true}
          hintText='50'
          value={this.props.form.value}
          floatingLabelText='Amount'
          onChange={this.onValueChange}
          disabled={wheelInMotion}
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
