/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Focus = props => {
  const { classes, children, focusOnClick, useArrows, useFalseFocus } = props;
  const [childFocus, setChildFocus] = useState(null);
  const [childFocusType, setChildFocusType] = useState(null);
  const [showFocus, setShowFocus] = useState(null);

  const config = () => el => {
    if (Array.isArray(children)) {
      // eslint-disable-next-line no-param-reassign
      if (el) el.tabIndex = 0;
      // check if elem has any focusable child
      const focusableChildren =
        (el &&
          el.querySelectorAll("input, button, select, textarea, a[href]")) ||
        [];

      if (focusableChildren.length) {
        setChildFocus(focusableChildren[0]);
        setChildFocusType(focusableChildren[0].nodeName);

        // eslint-disable-next-line no-param-reassign
        el.tabIndex = -1;
      }
    }

    setChildFocus(children);
    setChildFocusType("");
  };

  const onFocus = evt => {
    if(!useFalseFocus) evt.currentTarget.classList.add(classes.focused);
    setShowFocus(true);
    // give focus to child element if any focusable
    if (childFocus && childFocus.focus) childFocus.focus();
  };

  const onBlur = evt => {
    setShowFocus(false);
    if(!useFalseFocus) evt.currentTarget.classList.remove(classes.focused);
  };

  const onMouseDown = evt => {
    evt.preventDefault();
    evt.currentTarget.focus();
    // remove focus outline unless explicitly enabled
    if (!focusOnClick) {
      if(!useFalseFocus) evt.currentTarget.classList.remove(classes.focused);
      setShowFocus(false);
    }
  };

  const onKeyDown = evt => {
    const childFocusIsInput = childFocusType === "INPUT";

    if (
      evt.keyCode === 13 || // enter
      !useArrows
    ) {
      // trigger click on enter unless child focus is input
      if (!childFocusIsInput && evt.keyCode === 13) evt.currentTarget.click();
      return;
    }

    const nextSibling = evt.currentTarget.nextElementSibling;
    const prevSibling = evt.currentTarget.previousElementSibling;

    switch (evt.keyCode) {
      // arrow up
      case 38:
        if (prevSibling) prevSibling.focus();
        break;
      // arrow down
      case 40:
        if (nextSibling) nextSibling.focus();
        break;
      default:
    }
  };

  const cloneChildren = childrenToClone => {
    if (Array.isArray(childrenToClone)) {
      return React.Children.map(childrenToClone, child =>
        React.cloneElement(child, {
          className: classNames([child.props.className, classes.focusDisabled]),
          ref: config(),
          onFocus,
          onBlur,
          onMouseDown,
          onKeyDown
        })
      );
    }
    return React.cloneElement(childrenToClone, {
      className: classNames([
        childrenToClone.props.className,
        classes.focusDisabled
      ]),
      ref: config(),
      onFocus,
      onBlur,
      onMouseDown,
      onKeyDown
    });
  };

  const focusWrapper = childrenToWrap => {
    if (!useFalseFocus) return cloneChildren(childrenToWrap);

    return (
      <div className={classes.externalReference}>
        {cloneChildren(childrenToWrap)}
        {showFocus && <div className={classes.falseFocus} />}
      </div>
    );
  };

  return <>{focusWrapper(children)}</>;
};

Focus.propTypes = {
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied when focus disabled.
     */
    focusDisabled: PropTypes.string,
    /**
     * Styles applied when focus active.
     */
    focused: PropTypes.string
  }).isRequired,
  /**
   * Child node to set the focus.
   */
  children: PropTypes.node.isRequired,
  /**
   * Show focus when click element.
   */
  focusOnClick: PropTypes.bool,
  /**
   * Use up/ down keyboard arrows to control focus.
   */
  useArrows: PropTypes.bool,
  /**
  * Uses an absolute positioned div as a focus.
  */
  useFalseFocus: PropTypes.bool
};

Focus.defaultProps = {
  focusOnClick: false,
  useArrows: true,
  useFalseFocus: false
};

export default Focus;
