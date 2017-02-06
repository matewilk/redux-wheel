import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class Spin extends React.Component {
  constructor () {
    super();
    this.radius = '15';
    this.state = {
      hidden: false
    };

    this.bounceTransition = d3.transition()
      .duration(400).ease(d3.easeBounceOut);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.spinning !== nextProps.spinning) {
      let node = d3.select(ReactDOM.findDOMNode(this));

      if (nextProps.spinning.inMotion) {
        node.transition(this.bounceTransition)
          .attr('transform', () => {
            this.setState({hidden: true});

            return 'scale(0)';
          });
      } else {
        node.transition(this.bounceTransition)
          .attr('transform', () => {
            this.setState({hidden: false});

            return 'scale(1)';
          });
      }
    }
  }

  render () {
    let text = this.props.value ? `$${this.props.value}` : 'Spin!';
    let textTransform = this.props.rotAngle
      ? `rotate(${180 - this.props.rotAngle}) scale(1.4)`
      : 'rotate(0)';

    return (
      <g
        onTouchTap={this.state.hidden ? null : this.props.spinHandler}
        style={{cursor: this.state.hidden ? 'inherit' : 'pointer'}}
      >
        <circle ref='circle' r={this.radius} fill='rgba(94, 53, 177, 0.9)' />
        <text
          y='2%'
          fill='white'
          fontSize='6px'
          textAnchor='middle'
          transform={textTransform}
        >
          {text}
        </text>
      </g>
    );
  }
}

export default Spin;
