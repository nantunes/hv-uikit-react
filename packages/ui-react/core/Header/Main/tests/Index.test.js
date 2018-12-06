"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _ = _interopRequireDefault(require(".."));

var _Main = _interopRequireDefault(require("../Main"));

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

/* eslint-env jest */
describe("Header withStyles", function () {
  var wrapper;
  beforeEach(
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = (0, _enzyme.shallow)(_react.default.createElement(_.default, null));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  })));
  it("should be defined", function () {
    expect(wrapper).toBeDefined();
  });
  it("should render correctly", function () {
    expect(wrapper).toMatchSnapshot();
  });
  it("should render Menu component", function () {
    var userComponent = wrapper.find(_Main.default);
    expect(userComponent.length).toBe(1);
  });
});
//# sourceMappingURL=Index.test.js.map