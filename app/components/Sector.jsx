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

    this.arc = d3.arc()
      .outerRadius(45)
      .innerRadius(20)
      .cornerRadius(1);

    let transitionDuration = 400;
    this.onAppearTransition = d3.transition()
      .delay(transitionDuration * (props.sector.data.id + 1))
      .duration(transitionDuration);

    this.onEnterTransition = d3.transition()
      .duration(transitionDuration).ease(d3.easeCubicInOut);
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

  componentWillEnter (callback) {
    let node = d3.select(ReactDOM.findDOMNode(this));

    node.transition(this.onEnterTransition)
      .style('fill-opacity', 1)
      .on('end', () => {
        this.setState({fillOpacity: 1});
        callback();
      });
  }

  componentWillAppear (callback) {
    let node = d3.select(ReactDOM.findDOMNode(this));

    node.transition(this.onAppearTransition)
      .style('fill-opacity', 1)
      .on('end', () => {
        this.setState({fillOpacity: 1});
        callback();
      });
  }

  calculateTextTransform (d) {
    let midAngle = d.startAngle / 2 + d.endAngle / 2;
    let textTransform = `translate(${this.arc.centroid(d)}) rotate(${midAngle * 180 / Math.PI})`;

    return textTransform;
  }

  render () {
    let sector = this.props.sector.data;
    let textTransform = this.calculateTextTransform(this.props.sector);
    let d = this.arc(this.props.sector);
    return (
      <g onTouchTap={this.selectSector} fillOpacity={this.state.fillOpacity}>
        <path
          data-id={sector.id}
          d={d}
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
