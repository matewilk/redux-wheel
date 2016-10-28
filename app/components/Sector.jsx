import React from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

class Sector extends React.Component {
  constructor (props) {
    super(props);
    this.selectSector = this.selectSector.bind(this);
    this.calculateTextTransform = this.calculateTextTransform.bind(this);

    this.arc = d3.arc()
      .outerRadius(45)
      .innerRadius(20)
      .cornerRadius(1);
  }

  selectSector () {
    let sector = this.props.sector.data;
    let sectorId = sector.id;
    let selected = sector.selected;
    let name = sector.name;

    this.props.dispatch({
      type: 'sector.selectSector',
      id: sectorId
    });

    this.props.dispatch({
      type: 'form.valueChange',
      value: selected ? '' : name
    });
  }

  calculateTextTransform (d) {
    let midAngle = d.startAngle / 2 + d.endAngle / 2;
    let textTransform = `translate(${this.arc.centroid(d)}) rotate(${midAngle * 180 / Math.PI})`;

    return textTransform;
  }

  render () {
    let sector = this.props.sector;
    let textTransform = this.calculateTextTransform(this.props.sector);
    return (
      <g onTouchTap={this.selectSector}>
        <path
          data-id={sector.id}
          d={this.props.d}
          fill={this.props.fill}
        />
        <text
          fill='white'
          transform={textTransform}
          textAnchor='middle'
          fontSize='6px'>
          {sector.data.name}
        </text>
      </g>
    );
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
