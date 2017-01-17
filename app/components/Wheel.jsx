import React from 'react';
import { connect } from 'react-redux';
import ReactTransitionGroup from 'react-addons-transition-group';
import * as d3 from 'd3';

import Sector from './Sector';
import Spin from './Spin';

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
      '#3949AB',
      '#1E88E5',
      '#00ACC1',
      '#039BE5',
      '#8E24AA'
    ]);

    this.thetaDelta = 0.1;
    this.speedContraction = 0.5;

    this.spin = this.spin.bind(this);
    this.animateSpin = this.animateSpin.bind(this);
    this.handleSpin = this.handleSpin.bind(this);
    this.calculateWheelRotationAngle = this.calculateWheelRotationAngle.bind(this);

    this.state = {
      actionOwner: false,
      value: null,
      rotAngle: 0
    };
  }

  componentDidMount () {
    this.wheel = document.getElementById('wheel');
    this.requestAnimationFrameID;
  }

  handleSpin () {
    this.state.actionOwner = true;

    this.props.dispatch({
      type: 'spinning.spin'
    });
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.spinning.speed > 0) {
      this.spin();
    }

    if (this.props.spinning.inMotion && !nextProps.spinning.inMotion) {
      this.calculateSelectedValue(nextProps.spinning.theta);
    }
  }

  calculateSelectedValue (theta) {
    let sectorsCount = this.props.sectors.length;
    // +0.5 because value selector is at the bottom of the wheel
    let rotations = (theta / 360) + 0.5;
    let angle = (rotations % 1) * 360;
    let displacement = (angle / (360 / sectorsCount));
    let sector = sectorsCount - 1 - Math.floor(displacement);

    let value = this.props.sectors[sector].name;
    this.setState({value: value, rotAngle: angle});
  }

  spin () {
    this.requestAnimationFrameID = window.requestAnimationFrame(this.animateSpin);
  }

  calculateWheelRotationAngle () {
    this.wheel.setAttribute('transform', `translate(50, 50) rotate(${this.props.spinning.theta})`);
    this.props.spinning.theta += this.thetaDelta * this.props.spinning.speed;
    this.props.spinning.speed = this.props.spinning.speed - this.speedContraction;
  }

  animateSpin () {
    if (this.props.spinning.speed < this.speedContraction) {
      clearInterval(this.requestAnimationFrameID);

      this.props.dispatch({
        type: 'spinning.stop',
        theta: this.props.spinning.theta,
        actionOwner: this.state.actionOwner
      });

      this.state.actionOwner = false;

      return;
    }

    this.calculateWheelRotationAngle();
    this.requestAnimationFrameID = window.requestAnimationFrame(this.animateSpin);
  }

  render () {
    let transform = `translate(50, 50) rotate(${this.props.spinning.theta})`;
    return (
      <svg viewBox='0 0 100 100'>
        <g id='wheel' transform={transform}>
          <Spin
            spinHandler={this.handleSpin}
            spinning={this.props.spinning}
            value={this.state.value}
            rotAngle={this.state.rotAngle}
          />
          <ReactTransitionGroup component='g'>
            {this.pie(this.props.sectors).map((sector, index) => {
              return <Sector
                fill={this.color(index)}
                key={index}
                sector={sector}
                d={this.arc(sector)}
                dispatch={this.props.dispatch}
                inMotion={this.props.spinning.inMotion}
                index={index}
                arc={this.arc}
              />;
            })}
          </ReactTransitionGroup>
        </g>
        <path
          d='M 50,5 95,97.5 5,97.5 z'
          transform='scale(0.1) translate(450, 900)'
          fill='rgb(255, 64, 129)'
          strokeWidth='6'
          strokeLinejoin='round'
          stroke='white'
        />
      </svg>
    );
  }
}

// export the connected class
function mapStateToProps (state) {
  return ({
    sectors: state.sectors,
    spinning: state.spinning
  });
}
export default connect(mapStateToProps)(Wheel);
