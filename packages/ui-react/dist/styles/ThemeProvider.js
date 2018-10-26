"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash"));

var _styles = require("@material-ui/core/styles");

var _theme = _interopRequireDefault(require("./theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
var ThemeProvider = function ThemeProvider(_ref) {
  var children = _ref.children,
      theme = _ref.theme,
      sheetsManager = _ref.sheetsManager;
  return _react.default.createElement(_styles.MuiThemeProvider, {
    theme: theme ? _lodash.default.merge(_theme.default, theme) : _theme.default,
    sheetsManager: sheetsManager
  }, children);
};

ThemeProvider.propTypes = {
  children: _propTypes.default.node.isRequired,
  theme: _propTypes.default.instanceOf(Object),
  sheetsManager: _propTypes.default.instanceOf(Object)
};
ThemeProvider.defaultProps = {
  theme: null,
  sheetsManager: null
};
var _default = ThemeProvider;
exports.default = _default;