import React from 'react';
import { connect } from 'react-redux';
import {Row, Col} from 'react-flexbox-grid/lib/index';

import MainCard from './MainCard';

class App extends React.Component {
  constructor () {
    super();

    this.state = {
      loaded: false
    }
  }

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
    let boardId = this.generateBoardId();

    socket.emit('join', {board: boardId});

    this.props.dispatch({
      type: 'form.setBoardId',
      boardId: boardId
    });

    socket.on('sync', (syncData) => {
      // this.setState({loaded: true});

      this.props.dispatch({
        type: 'spinning.sync',
        theta: syncData.theta
      });

      this.props.dispatch({
        type: 'sectors.sync',
        sectors: syncData.sectors
      });
    });
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.boardId !== nextProps.params.boardId) {
      window.location.reload();
    }
  }

  render () {
    // let comp = this.state.loaded ? <MainCard /> : 'Loading ...';
    return (
      <Row center='xs'>
        <Col xs={12} sm={10} md={10} lg={8}>
          <MainCard />
        </Col>
      </Row>
    );
  }
}

export default connect()(App);
