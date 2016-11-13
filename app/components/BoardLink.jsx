import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid/lib/index';
import { TextField, RaisedButton } from 'material-ui';
import CopyIcon from 'material-ui/svg-icons/content/content-copy';
import CopyToClipboard from 'react-copy-to-clipboard';

class BoardLink extends React.Component {
  constructor () {
    super();
    this.state = {
      copied: false
    };

    this.onCopy = this.onCopy.bind(this);
  }

  onChange (element, value) {}

  onCopy () {
    this.setState({copied: true});
    setTimeout(() => {
      this.setState({copied: false});
    }, 5000)
  }

  render () {
    let style = {
      color: 'grey',
      fontStyle: 'normal',
      fontSize: '10px'
    };

    return (
      <Row>
        <Col xs={12}>
          <Row center="xs">
            <Col xs={6}>
              <TextField
                fullWidth={true}
                value={this.props.form.link}
                floatingLabelText='Your Link'
                disabled={false}
                onChange={this.onChange}
                inputStyle={Object.assign({}, style, {textAlign: 'center', fontSize: '13px'})}
              />
              <CopyToClipboard 
                text={this.props.form.link}
                onCopy={this.onCopy}>
                <RaisedButton 
                  icon={<CopyIcon />}
                  label={this.state.copied ? 'Copied' : 'Copy'}
                  labelStyle={style}
                />
              </CopyToClipboard>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps (state) {
  return ({
    form: state.form,
  });
}

export default connect(mapStateToProps)(BoardLink);
