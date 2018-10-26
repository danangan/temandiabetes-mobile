import React, { Component } from 'react';
import { Image } from 'react-native';
import applyScale from '../utils/applyScale';

class ResponsiveImage extends Component {
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    const width = applyScale(this.props.initWidth);
    const height = applyScale(this.props.initHeight);
    const Component = this.props.component;
    return (
      <Component
        style={[{ width, height }, this.props.style]}
        source={this.props.source}
        ref={component => (this._root = component)}
        resizeMode={this.props.resizeMode || 'cover'}
        onLoadStart={this.props.onLoadStart}
        onProgress={this.props.onProgress}
        onLoad={this.props.onLoad}
        onError={this.props.onError}
        onLoadEnd={this.props.onLoadEnd}
        defaultSource={this.props.defaultSource}
        borderRadius={this.props.borderRadius}
      >
        {this.props.children}
      </Component>
    );
  }
}

ResponsiveImage.defaultProps = {
  component: Image
};

export { ResponsiveImage };
