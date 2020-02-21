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

import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import Success from "@hv/uikit-react-icons/dist/Generic/Success";
import Close from "@hv/uikit-react-icons/dist/Generic/CloseXS";
import Unsuccess from "@hv/uikit-react-icons/dist/Generic/Fail";
import { isKeypress, KeyboardCodes } from "@hv/uikit-common-utils/dist";

import validationStates from "./validationStates";

function onKeyDownClear(e, handleClear) {
  if (isKeypress(e, KeyboardCodes.Enter)) {
    handleClear();
  }
}

const InputAdornment = ({
  inputId,
  classes,
  showValidationIcon,
  validationState,
  customFixedIcon,
  handleClear,
  showClear,
  clearButtonLabel
}) => {
  const renderValidationIcon = state => {
    switch (state) {
      case validationStates.valid:
        return <Success semantic="sema1" className={classes.icon} />;
      case validationStates.invalid:
        return <Unsuccess semantic="sema4" className={classes.icon} />;
      default:
        return null;
    }
  };

  return (
    <div className={classes.adornmentsBox} aria-hidden="true">
      {showClear && (
        <button
          type="button"
          tabIndex={-1}
          aria-controls={inputId || undefined}
          aria-label={clearButtonLabel}
          title={clearButtonLabel}
          className={clsx(classes.adornmentButton, classes.iconClear)}
          onMouseDown={handleClear}
          onKeyDown={e => onKeyDownClear(e, handleClear)}
        >
          <Close className={classes.icon} />
        </button>
      )}

      {(showValidationIcon && renderValidationIcon(validationState)) ||
        (customFixedIcon &&
          React.cloneElement(customFixedIcon, {
            className: clsx(classes.icon, customFixedIcon.props.className)
          }))}
    </div>
  );
};

InputAdornment.propTypes = {
  /**
   * Id of the adorned input.
   */
  inputId: PropTypes.string,

  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.instanceOf(Object).isRequired,

  /**
   * If `true` the validation icon is shown, if `false` it is not
   */
  showValidationIcon: PropTypes.bool,
  /**
   * The state of the input.
   *
   * note: Is recommended you use the provided validationStates object to set this value.
   */
  validationState: PropTypes.oneOf(["empty", "filled", "invalid", "valid"]),

  /**
   * If `true` the clear button is shown, if `false` it is not
   */
  showClear: PropTypes.bool,
  /**
   * The function that will be executed when the icon is clicked
   */
  handleClear: PropTypes.func,
  /**
   * The label of the clear button
   */
  clearButtonLabel: PropTypes.string,

  /**
   * a custom icon to be added into the input.
   */
  customFixedIcon: PropTypes.node
};

InputAdornment.defaultProps = {
  inputId: null,

  showValidationIcon: true,
  validationState: validationStates.empty,

  showClear: true,
  handleClear: value => value,
  clearButtonLabel: "Clear the text",

  customFixedIcon: null
};

export default InputAdornment;
