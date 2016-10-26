import React from 'react';
import {Row, Col} from 'react-flexbox-grid/lib/index';

import MainCard from './MainCard';

export default class App extends React.Component {
  render () {
    return (
      <Row center='xs'>
        <Col xs={12} sm={10} md={10} lg={8}>
          <MainCard />
        </Col>
      </Row>
    );
  }
}
