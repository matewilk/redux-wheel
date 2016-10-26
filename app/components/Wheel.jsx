import React from 'react';
import { connect } from 'react-redux';

import Sector from './Sector';

class Wheel extends React.Component {
  render () {
    return (
      <ul>
        {this.props.sectors.map((sector, index) => {
          return <Sector key={index} sector={sector} />;
        })}
      </ul>
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
