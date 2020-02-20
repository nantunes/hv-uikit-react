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

/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import Play from "@hv/uikit-react-icons/dist/Generic/Play";
import Stop from "@hv/uikit-react-icons/dist/Generic/Stop";

import HvProvider from "../../../Provider";
import Actions, { Action } from "../index";

describe("Actions", () => {
  let wrapper;

  it("should be able to render", () => {
    wrapper = mount(
      <HvProvider>
        <Actions>
          <Action label="Action 1" icon={<Play />} />
          <Action label="Action 2" />
          <Action label="Action 3" icon={<Stop />} />
        </Actions>
      </HvProvider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
