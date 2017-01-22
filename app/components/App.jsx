import React from 'react';
import { connect } from 'react-redux';
import {Row, Col} from 'react-flexbox-grid/lib/index';

import MainCard from './MainCard';
import Progress from './Progress';

class App extends React.Component {
  constructor () {
    super();

    this.state = {
      loaded: false
    };
  }

  generateBoardId () {
    if (this.props.params.boardId) {
      return this.props.params.boardId;
    } else {
      let boardId = Math.random().toString(36).substring(2, 7);
      history.pushState({}, '', boardId);
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
      this.setState({loaded: true});

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
    let component = this.state.loaded ? <MainCard /> : <Progress />;
    return (
      <Row center='xs'>
        <Col xs={12} sm={10} md={10} lg={8}>
          {component}
        </Col>
      </Row>
    );
  }
}

export default connect()(App);
