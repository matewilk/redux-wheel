import React from 'react';
// import io from 'socket.io-client';
import {Row, Col} from 'react-flexbox-grid/lib/index';

import MainCard from './MainCard';

export default class App extends React.Component {

  generateBoardId () {
    if (this.props.params.boardId) {
      return this.props.params.boardId;
    } else {
      let boardId = Math.random().toString(36).substring(2, 7);
      this.props.router.push(`/${boardId}`);
      return boardId;
    }
    
  }

  componentDidMount () {
    let socket = this.props.route.socket;
    socket.emit('join', {room: this.generateBoardId()});
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.boardId !== nextProps.params.boardId) {
      window.location.reload();
    }
  }

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
