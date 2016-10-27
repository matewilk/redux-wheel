import React from 'react';
import { connect } from 'react-redux';

class Sector extends React.Component {
  constructor (props) {
    super(props);
    this.selectSector = this.selectSector.bind(this);
  }

  render () {
    const sector = this.props.sector;

    return (
      <li onTouchTap={this.selectSector} data-id={sector.id}>{sector.name}, {JSON.stringify(sector.selected)}</li>
    );
  }

  selectSector (event) {
    const sectorId = Number(event.target.dataset.id);

    this.props.dispatch({
      type: 'sector.selectSector',
      id: sectorId
    });

    this.props.dispatch({
      type: 'form.valueChange',
      value: this.props.sector.selected ? '' : this.props.sector.name
    });
  }
}

// make sure we have all the props
Sector.propTypes = {
  sector: React.PropTypes.object.isRequired
};

// export the connected class
function mapStateToProps (state) {
  return ({
    form: state.form,
    sectors: state.sectors
  });
}
export default connect(mapStateToProps)(Sector);
