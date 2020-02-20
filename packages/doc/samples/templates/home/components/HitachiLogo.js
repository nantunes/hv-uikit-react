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
import withStyles from "@material-ui/core/styles/withStyles";

const HitachiLogo = props => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 80 16"
    xmlSpace="preserve"
    width={80}
    height={16}
    {...props}
  >
    <path
      fill={props.theme.hv.palette.accent.acce1}
      d="M63.6,2.5c0,0,0,4.8,0,4.7H70c0,0,0-4.7,0-4.7s3.1,0,3.1,0c0,0,0,11.8,0,11.9H70c0,0,0-5.2,0-5.2c0,0-6.3,0-6.3,0c0,0,0,5.2,0,5.2h-3.1c0,0,0-11.9,0-11.9C60.5,2.5,63.6,2.5,63.6,2.5z"
    />
    <path
      fill={props.theme.hv.palette.accent.acce1}
      d="M33.9,2.5c0,0,0,2,0,2h-4.8v9.8h-3.1V4.5h-4.8v-2C21.1,2.5,33.9,2.5,33.9,2.5z"
    />
    <path
      fill={props.theme.hv.palette.accent.acce1}
      d="M46,14.3c0,0-3.5,0-3.5,0l-1-2.6h-5.9c0,0-1,2.6-1,2.6h-3.5l5.5-11.9h3.8L46,14.3z M38.6,4.5l-2.2,5.4h4.4L38.6,4.5"
    />
    <rect
      x="75.6"
      y="2.5"
      fill={props.theme.hv.palette.accent.acce1}
      width="3.1"
      height="11.9"
    />
    <path
      fill={props.theme.hv.palette.accent.acce1}
      d="M4.9,2.5c0,0,0,4.8,0,4.7h6.3c0,0,0-4.7,0-4.7s3.1,0,3.1,0c0,0,0,11.8,0,11.9h-3.1c0,0,0-5.2,0-5.2c0,0-6.3,0-6.3,0c0,0,0,5.2,0,5.2H1.7c0,0,0-11.9,0-11.9C1.7,2.5,4.9,2.5,4.9,2.5z"
    />
    <rect
      x="16.9"
      y="2.5"
      fill={props.theme.hv.palette.accent.acce1}
      width="3.1"
      height="11.9"
    />
    <path
      fill={props.theme.hv.palette.accent.acce1}
      d="M45.9,11c-0.3-0.8-0.4-1.6-0.4-2.5c0-1.2,0.2-2.4,0.8-3.4c0.6-1,1.5-1.8,2.7-2.2
			c1.1-0.4,2.2-0.6,3.5-0.6c1.4,0,2.7,0.3,4,0.8c1.1,0.5,2,1.5,2.2,2.7c0.1,0.3,0.1,0.5,0.1,0.8h-3.3c0-0.3-0.1-0.6-0.2-0.9
			c-0.3-0.6-0.8-1.2-1.5-1.4c-0.4-0.1-0.9-0.2-1.4-0.2c-0.5,0-1.1,0.1-1.5,0.3c-0.8,0.3-1.4,0.9-1.7,1.7
			c-0.3,0.8-0.4,1.6-0.4,2.5c0,0.7,0.1,1.4,0.3,2.1c0.2,0.9,0.9,1.6,1.7,1.9c0.5,0.2,1.1,0.3,1.7,0.3c0.5,0,1-0.1,1.5-0.2
			c0.6-0.2,1.1-0.6,1.4-1.2c0.2-0.4,0.3-0.8,0.3-1.3h3.3c0,0.4-0.1,0.8-0.2,1.1c-0.3,1.2-1.1,2.2-2.2,2.6
			c-1.2,0.5-2.6,0.8-4,0.8c-1.1,0-2.2-0.2-3.2-0.5C47.8,13.6,46.5,12.5,45.9,11z"
    />
  </svg>
);

export default withStyles(null, { withTheme: true })(props => (
  <HitachiLogo theme={props.theme} style={{ width: 72, height: 20 }} />
));
