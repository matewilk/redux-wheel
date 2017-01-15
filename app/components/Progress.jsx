import React from 'react';
import {Row, Col} from 'react-flexbox-grid/lib/index';

class Progress extends React.Component {
  render () {
    return (
      // parent component has to have height in order this to work
      <Row middle='xs' style={{height: '100%'}}>
        <Col xs={12}>
          <Row center='xs'>
            <Col xs={6}>
              Generating board ...
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Progress;
