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
    const sector_id = Number(event.target.dataset.id);
    const sector_name = event.target.innerHTML;

    this.props.dispatch({
      type: 'sector.selectSector',
      id: sector_id,
      sector: sector_name
    });

    this.props.dispatch({
      type: 'form.valueEdit',
      id: sector_id,
      sector: event.target.textContent,
      form: this.props.form
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
    form: state.form
  });
}
export default connect(mapStateToProps)(Sector);
