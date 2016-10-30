import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class Sector extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      fillOpacity: 0
    };

    this.selectSector = this.selectSector.bind(this);
    this.calculateTextTransform = this.calculateTextTransform.bind(this);
    this.onShowTransition = this.onShowTransition.bind(this);

    let transitionDuration = 400;
    this.onAppearTransition = d3.transition()
      .delay(transitionDuration * (props.sector.data.id + 1))
      .duration(transitionDuration);

    this.onEnterTransition = d3.transition()
      .duration(transitionDuration).ease(d3.easeCubicInOut);

    this.bounceTransition = d3.transition()
      .duration(transitionDuration).ease(d3.easeBounceOut);
  }

  selectSector () {
    let sector = this.props.sector.data;
    let sectorId = sector.id;
    let selected = sector.selected;
    let name = sector.name;

    this.props.dispatch({
      type: 'sector.selectSector',
      id: sectorId
    });

    this.props.dispatch({
      type: 'form.valueChange',
      value: selected ? '' : name
    });
  }

  onShowTransition (transitionType, callback) {
    let node = d3.select(ReactDOM.findDOMNode(this));

    node.transition(transitionType)
      .style('fill-opacity', 0.9)
      .on('end', () => {
        this.setState({fillOpacity: 0.9});
        callback();
      });
  }

  componentWillEnter (callback) {
    this.onShowTransition(this.onEnterTransition, callback);
  }

  componentWillAppear (callback) {
    this.onShowTransition(this.onAppearTransition, callback);
  }

  calculateTextTransform (d) {
    let arc = this.props.arc;
    let midAngle = d.startAngle / 2 + d.endAngle / 2;
    let textTransform = `translate(${arc.centroid(d)}) rotate(${midAngle * 180 / Math.PI})`;

    return textTransform;
  }

  componentWillReceiveProps (nextProps) {
    let node = d3.select(ReactDOM.findDOMNode(this));
    let selected = nextProps.sector.data.selected;
    let opacity = selected ? 1 : 0.9;

    node.transition(this.onEnterTransition)
      .style('fill-opacity', opacity)
      .on('end', () => {
        this.setState({fillOpacity: opacity});
      });

    node.transition(this.onEnterTransition)
      .ease(d3.easeBounceOut)
      .attr('transform', (d) => {
        if (selected) {
          let dist = 3;
          let midAngle = ((nextProps.sector.endAngle - nextProps.sector.startAngle) / 2) + nextProps.sector.startAngle;
          var x = Math.sin(midAngle) * dist;
          var y = -Math.cos(midAngle) * dist;
          return 'translate(' + x + ',' + y + ')';
        } else {
          return 'translate(0, 0)';
        }
      });
  }

  render () {
    let sector = this.props.sector.data;
    let textTransform = this.calculateTextTransform(this.props.sector);

    return (
      <g onTouchTap={this.selectSector} fillOpacity={this.state.fillOpacity}>
        <path
          data-id={sector.id}
          d={this.props.d}
          fill={this.props.fill}
        />
        <text
          fill='white'
          transform={textTransform}
          textAnchor='middle'
          fontSize='6px'>
          {sector.name}
        </text>
      </g>
    );
  }
}

// make sure we have all the props
Sector.propTypes = {
  sector: React.PropTypes.object.isRequired
};

export default Sector;
