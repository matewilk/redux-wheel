import React from 'react';
import { connect } from 'react-redux';
import ReactTransitionGroup from 'react-addons-transition-group';
import * as d3 from 'd3';

import Sector from './Sector';

class Wheel extends React.Component {
  constructor () {
    super();

    this.pie = d3.pie()
      .value(function (d) { return d.count; })
      .padAngle(0.005)
      .sort(null);

    this.arc = d3.arc()
      .outerRadius(45)
      .innerRadius(20)
      .cornerRadius(1);

    this.color = d3.scaleOrdinal([
      '#E53935',
      '#D81B60',
      '#8E24AA',
      '#5E35B1',
      '#3949AB',
      '#1E88E5',
      '#039BE5',
      '#00ACC1',
      '#00897B',
      '#43A047'
    ]);
  }

  render () {
    let transform = `translate(50, 50)`;
    return (
      <svg viewBox='0 0 100 100'>
        <g transform={transform}>
          <ReactTransitionGroup component='g'>
            {this.pie(this.props.sectors).map((sector, index) => {
              return <Sector
                fill={this.color(index)}
                key={index}
                sector={sector}
                d={this.arc(sector)}
                dispatch={this.props.dispatch}
                index={index}
              />;
            })}
          </ReactTransitionGroup>
        </g>
      </svg>
    );
  }
}

// export the connected class
function mapStateToProps (state) {
  return ({
    sectors: state.sectors
  });
}
export default connect(mapStateToProps)(Wheel);
