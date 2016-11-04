import React from 'react';

class Spin extends React.Component {
  render () {
    return (
      <g onTouchTap={this.props.spinHandler}>
        <circle r='15' fill='rgba(94, 53, 177, 0.9)'/>
        <text y='2%' fill='white' fontSize='6px' textAnchor="middle">Spin!</text>
      </g>
    );
  }
}

export default Spin;
