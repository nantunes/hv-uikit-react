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
import ReactTable, { ReactTableDefaults } from "react-table";
import checkboxHOC from "react-table/lib/hoc/selectTable";
import "react-table/react-table.css";
import PropTypes from "prop-types";
import deprecatedPropType from "@material-ui/core/utils/deprecatedPropType";
import classNames from "classnames";
import SortAsc from "@hv/uikit-react-icons/dist/SortAscending.XS";
import SortDesc from "@hv/uikit-react-icons/dist/SortDescending.XS";
import isNil from "lodash/isNil";
import { MenuItem } from "@material-ui/core";
import MoreVert from "@hv/uikit-react-icons/dist/MoreOptionsVertical.S";
import _ from "lodash";
import HvTypography from "../Typography";
import expander from "./expander/expander";
import {
  appendClassnames,
  createExpanderButton,
  setHeaderSortableClass,
  setColumnBorder
} from "./columnUtils";
import {
  toggleAll,
  isIndeterminateStatus,
  toggleSelection,
  isSelected
} from "./checkBoxUtils";
import HvCheckBox from "../Selectors/CheckBox";

import ReactTablePagination from "./Pagination";
import { tableStyleOverrides } from "./styles";
import DropDownMenu from "../DropDownMenu";

/**
 * Table component. This component offers:
 * - A standard table;
 * - Table with expander;
 * - Table with checkbox.
 *
 * The type is defined by the existence of the properties:
 *  - subElementTemplate: Creates a table with expander;
 *  - idForCheckbox: Creates a table with checkboxs;
 *  - None: Creates a simple table.
 *
 *   Just one of this properties should be set (or none) has it isn't possible to have a table with
 *   expander and checkbox simultaneously.
 */
class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // table component to be render
      Table: props.idForCheckbox ? checkboxHOC(ReactTable) : ReactTable,
      // the columns that are sorted
      sorted: props.defaultSorted || [],
      // flag for controlling if the component as been render before
      initiallyLoaded: false,
      // Controls which row is expanded.
      expanded: {},
      // Controls which row is selected using the checkboxes.
      selection: props.selections || [],
      // Controls if the select all options has been used
      selectAll: false
    };
  }

  /**
   * Change the state property initiallyLoaded to identify that it is the first load.
   */
  componentDidMount() {
    const { initiallyLoaded } = this.state;
    const { data, idForCheckbox } = this.props;
    if (!initiallyLoaded) {
      this.state.initiallyLoaded = true;
    }
    this.state.recordQuantity = data.length;

    if (!idForCheckbox) {
      /* eslint-disable-next-line global-require */
      const withFixedColumns = require("react-table-hoc-fixed-columns");
      this.state.Table = withFixedColumns.default(ReactTable);
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { selections } = props;
    if (selections !== state.selections) {
      return {
        selections
      };
    }

    return null;
  }

  /**
   *
   * Returns data set with nulls replaced by em dashes.
   *
   * @returns {Array} new data set
   */
  sanitizedData = () => {
    const { data } = this.props;
    const newData = [];
    let newEntry = {};
    _.map(data, (entry) => {
      newEntry = {};
      _.each(entry, (val, key) => {
        newEntry[key] = val === null ? `\u2014` : val;
      })
      newData.push(newEntry);
    })

    return newData;
  };

  /**
   *
   * Returns subtitle with the correct number of selected checkboxes.
   *
   * @param numRows - number of rows in table
   * @returns {String} number selected
   */
  getCheckBoxHeader = (numRows) => {
    const { selection } = this.state;
    if (selection.length === 0) {
      return "All";
    }

    return `${selection.length} of ${numRows}`;

  };

  /**
   *
   * Returns dropdown menu children prop with correct action names.
   */
  getSecondaryActions = (menuOptions) => {
    const { classes } = this.props;
    const listItems = _.map(menuOptions, (option, index) => (
      <MenuItem key={index} className={classes.menuItem}>
        {option.label}
      </MenuItem>
    ));
    return listItems;
  }

  /**
   *
   * Returns the corresponding icon for the type of sorting (ascending or descending).
   *
   * @param id - the used to find the column.
   * @returns {*} - 'false' if the column doesn't exist.
   */
  getSortedComponent = id => {
    const { sorted } = this.state;

    const sortInfo = sorted.filter(item => item.id === id);

    if (sortInfo.length) {
      if (sortInfo[0].desc === true) return <SortDesc />;
      if (sortInfo[0].desc === false) return <SortAsc />;
    }
    return false;
  };

  /**
   * Pagination customizations.
   *
   * @returns {{showPageSizeOptions: HvTable.props.showPageSize, showPagination: HvTable.props.showPagination}}
   */
  getPaginationProps = () => {
    const { data, pageSize: propsPageSize } = this.props;
    const { showPagination, showPageSize } = this.props;
    const { pageSize = data.length, onPageSizeChange, pages } = this.props;

    return {
      showPagination,
      ...(showPagination && { PaginationComponent: ReactTablePagination }),
      ...(showPagination && onPageSizeChange && { onPageSizeChange }),
      ...(showPagination && pages && { pages }),

      ...((propsPageSize !== undefined && { defaultPageSize: propsPageSize }) ||
        (pageSize && { defaultPageSize: pageSize })),

      ...{ showPageSizeOptions: showPageSize }
    };
  };

  /**
   * Obtains server side data.
   *
   * @returns {Object}
   */
  getServerSizeProps = () => {
    const { paginationServerSide } = this.props;

    return {
      ...(paginationServerSide && { manual: true }),
      ...(paginationServerSide && { onFetchData: this.onFetchDataInternal })
    };
  };

  /**
   *
   * Add the class "sorted" to the selected column.
   *
   * @param sortedColumn - the column representation from the user.
   * @param col - column representation from react tables that is going to be modified.
   */
  highlightSortedColumn = (sortedColumn, col) => {
    const column = col;
    column.className = "sorted";
    this.setState({ sorted: sortedColumn });
  };

  /**
   * Sort properties override to set onSortedChange
   *
   * @returns {{sortable: HvTable.props.sortable}}
   */
  getSortProps = () => {
    const { sortable, defaultSorted } = this.props;

    return {
      sortable,
      ...(sortable && { defaultSorted }),
      ...(sortable && {
        onSortedChange: this.highlightSortedColumn
      })
    };
  };

  /**
   * Function used to load data asynchronously.
   *
   * @param {Object} tableState - an Object containing information about the current state of the table.
   */
  onFetchDataInternal = tableState => {
    const { onFetchData } = this.props;
    const { initiallyLoaded, sorted: sortedFromState } = this.state;
    const { pageSize, page, sorted } = tableState;

    if (initiallyLoaded) {
      let cursor = `${page * pageSize}`;

      if (sortedFromState[0] !== sorted[0]) {
        cursor = "0";
      }

      onFetchData(cursor, pageSize, sorted);
    }
  };

  /**
   * Override of the thead th. This method is used to add properties to the entire column.
   *
   * @param {Object} state - The current state of the table.
   * @param {Object} rowInfo - An object containing information about the row.
   * @param {Object} column - An object containing information about the column.
   * @returns {{className: (theadTh|{outline, backgroundColor, "& > div"})}}
   */
  getTheadThProps = (state, rowInfo, column) => {
    const { classes, sortable, idForCheckbox, secondaryActions } = this.props;
    const { sorted } = this.state;
    let isSortable = sortable && (isNil(column.sortable) || column.sortable);

    if(column.id === "secondaryActions") {
      isSortable = null
    }

    setColumnBorder(column, !!idForCheckbox, !!secondaryActions);

    appendClassnames(column, sorted, classes);

    if (column.id !== "secondaryActions") {
      return {
        className: setHeaderSortableClass(isSortable, classes.theadTh)
      };
    }

    return {
      className: classNames(classes.theadTh, "secondaryAction")
    };

  };

  /**
   * A getter for the row provided by the React table
   * used to add an onClick function to open the expander when the row is clicked.
   *
   * @param {Object} state - The current state of the table.
   * @param {Object} rowInfo - An object containing information about the row.
   * @returns {Object} - The object that contains the classes to be applied to the table.
   */
  getTrProps = (state, rowInfo) => {
    const { classes, subElementTemplate, idForCheckbox } = this.props;
    const { expanded, selection } = this.state;
    if (subElementTemplate && rowInfo && rowInfo.row) {
      return {
        onClick: () => {
          this.setState({
            expanded: { [rowInfo.viewIndex]: !expanded[rowInfo.viewIndex] }
          });
        },
        className: classNames(classes.tr, classes.pointer)
      };
    }

    if (idForCheckbox && rowInfo && rowInfo.row && selection.includes(rowInfo.original.id)) {
      return {className: classNames(classes.tr, "selected")};
    }

    return { className: classes.tr };
  };

  //  ----------- Checkbox -----------

  /**
   * Check if the row is selected based on it's key.
   *
   * @param {Number} key - the key that uniquely identifies the row.
   */
  isSelected = key => {
    const { selection } = this.state;
    return isSelected(key, selection);
  };

  /**
   * Selects or unselect a row.
   *
   * @param {Number} key - the key that uniquely identifies the row.
   */
  toggleSelection = key => {
    // start off with the existing state
    const { selection } = this.state;
    const { onSelection } = this.props;

    const select = toggleSelection(key, selection);

    if (select.length === 0) this.setState({ selectAll: false });

    // update the state
    this.setState({ selection: select }, () => {
      onSelection(select);
    });
  };

  /**
   *  Adds the indeterminate status to the checkbox when necessary.
   */
  isIndeterminateStatus = () => {
    const { selection, recordQuantity } = this.state;
    return isIndeterminateStatus(selection, recordQuantity);
  };

  /**
   * Selects all the avaible rows on the page.
   */
  toggleAll = () => {
    const { idForCheckbox, onSelection } = this.props;
    const { selectAll } = this.state;

    const stateToSet = toggleAll(idForCheckbox, selectAll, this.checkboxTable);
    this.setState(
      {
        selectAll: stateToSet.selectAll,
        selection: stateToSet.selection
      },
      () => {
        onSelection(stateToSet.selection);
      }
    );
  };

  render() {
    const {
      classes,
      className,
      id,
      columns,
      data,
      titleText,
      subtitleText,
      subElementTemplate,
      idForCheckbox,
      useRouter,
      getTrProps,
      labels,
      secondaryActions,
      ...other
    } = this.props;

    const { expanded, selectAll, Table: AugmentedTable, selection } = this.state;

    const tableStyles = tableStyleOverrides(classes);

    // Add dropdown menu column if secondaryActions exists in props
    if (!!secondaryActions && !columns.some(col => col.accessor === "secondaryActions")) {
      columns.push({
        headerText: "",
        accessor: "secondaryActions",
        cellType: "alpha-numeric",
        Cell: () => (
          <DropDownMenu icon={<MoreVert />} position="bottom-end">
            {this.getSecondaryActions(secondaryActions)}
          </DropDownMenu>
        )
      })
    }

    // Creates the thead with the text and the sorted icon.
    const ColumnSettings = {
      ...ReactTableDefaults.column,
      Header: props => {
        const Sorted = this.getSortedComponent(props.column.id);
        const SortedIcon = !Sorted ? <SortAsc /> : Sorted;

        const sortedIconClasses = Sorted
          ? classes.sortedIconShown
          : classes.sortedIconHidden;

        return (
          <div className={classNames(classes.headerContainer, className)}>
            <div className={classNames(classes.rtSortIcon, sortedIconClasses)}>
              {SortedIcon}
            </div>
            {/* Setter of the styles for the header */}
            <div className={classes.headerTextContainer}>
              <HvTypography
                variant="highlightText"
                className={classNames(classes.headerProps, {
                  [classes.headerAlphaNumeric]:
                  props.column.cellType === "alpha-numeric" ||
                  props.column.cellType === "link",
                  [classes.headerNumeric]: props.column.cellType === "numeric"
                })}
              >
                {props.column.headerText}
              </HvTypography>
            </div>
          </div>
        );
      }
    };

    const paginationProps = this.getPaginationProps();
    const serverSizeProps = this.getServerSizeProps();
    const sortProps = this.getSortProps();

    Object.assign(ReactTableDefaults, {
      column: ColumnSettings
    });

    // add expander button
    const newColumn = createExpanderButton(
      columns,
      subElementTemplate,
      classes
    );
    // add expander
    const newSubComponent = expander(subElementTemplate, classes);

    // checkbox properties
    const checkboxProps = {
      SelectAllInputComponent: () => (
        <div className={classNames(classes.checkBox)} />
      ),
      SelectInputComponent: props => (
        <HvCheckBox
          checked={this.isSelected(props.id)}
          onChange={() => this.toggleSelection(props.id)}
        />
      )
    };

    const checkUseRoute = useRouter ? getTrProps.bind(this.props) : getTrProps;
    const lockIconClasses = selection.length > 0
      ? classes.lockIconSelected
      : classes.lockIcon;
    const trashIconClasses = selection.length > 0
      ? classes.trashIconSelected
      : classes.trashIcon;
    const checkboxRowClasses = selection.length > 0
      ? classNames(classes.checkBoxRow, classes.checkBoxRowSelected)
      : classes.checkBoxRow

    return (
      <div id={id} className={classes.tableContainer}>
        {(titleText || labels.titleText) && (
          <div className={classes.title}>
            <div>
              <HvTypography variant="mTitle">
                {titleText || labels.titleText}
              </HvTypography>
            </div>
            {(subtitleText || labels.subtitleText) && (
              <div className={classes.subtitle}>
                <HvTypography variant="normalText">
                  {subtitleText || labels.subtitleText}
                </HvTypography>
              </div>
            )}
          </div>
        )}
        {!!idForCheckbox &&
        <div className={classNames(checkboxRowClasses)}>
          <div className={classes.checkBoxText}>
            <HvCheckBox
              onChange={() => this.toggleAll()}
              checked={selectAll}
              indeterminate={this.isIndeterminateStatus()}
            />
            {this.getCheckBoxHeader(data.length)}
          </div>
          <div className={classes.checkBoxText}>
            <div className={classNames(trashIconClasses)} />
            <div className={classNames(lockIconClasses)} />
          </div>
        </div>}
        <AugmentedTable
          {...other}
          {...tableStyles}
          {...paginationProps}
          {...serverSizeProps}
          {...sortProps}
          {...checkboxProps}
          /* eslint no-return-assign: 0 */
          ref={r => (this.checkboxTable = r)}
          getTheadThProps={this.getTheadThProps}
          getTrProps={getTrProps ? checkUseRoute : this.getTrProps}
          data={this.sanitizedData()}
          columns={newColumn}
          className="-highlight"
          SubComponent={newSubComponent}
          expanded={expanded}
          keyField={idForCheckbox}
          isSelected={this.isSelected}
        />
      </div>
    );
  }
}

Table.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * the classes object to be applied into the root object.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the component thead.
     */
    thead: PropTypes.string,
    /**
     * Styles applied to the component tr.
     */
    tr: PropTypes.string,
    /**
     * Styles applied to the component sort icon.
     */
    rtSortIcon: PropTypes.string,
    /**
     * Styles applied to the component when the sort icon is shown.
     */
    sortedIconShown: PropTypes.string,
    /**
     * Styles applied to the component when the sort icon is hidden.
     */
    sortedIconHidden: PropTypes.string,
    /**
     * Styles applied to the component pointer.
     */
    pointer: PropTypes.string,
    /**
     * Styles applied to the component subtitle.
     */
    subtitle: PropTypes.string,
    /**
     * Styles applied to the component title.
     */
    title: PropTypes.string,
    /**
     * Styles applied to the component header container.
     */
    headerContainer: PropTypes.string,
    /**
     * Styles applied to the component header text container.
     */
    headerTextContainer: PropTypes.string,
    /**
     * Styles applied to the component header props.
     */
    headerProps: PropTypes.string,
    /**
     * Styles applied to the component header when type is alphanumeric.
     */
    headerAlphaNumeric: PropTypes.string,
    /**
     * Styles applied to the component header when type is numeric.
     */
    headerNumeric: PropTypes.string,
    /**
     * Styles applied to the component to center.
     */
    centered: PropTypes.string,
    /**
     * Styles applied to the component when type is alphanumeric.
     */
    alphaNumeric: PropTypes.string,
    /**
     * Styles applied to the component when type is alphanumeric.
     */
    numeric: PropTypes.string,
    /**
     * Styles applied to the component when type is link.
     */
    link: PropTypes.string,
    /**
     * Styles applied to the component expander.
     */
    subComponentContainer: PropTypes.string,
    /**
     * Styles applied to the component icon in the columns.
     */
    iconContainer: PropTypes.string,
    /**
     * Styles applied to the component columns.
     */
    firstWithNumeric: PropTypes.string
  }).isRequired,
  /**
   * The labels inside the table.
   */
  labels: PropTypes.shape({
    titleText: PropTypes.string,
    subtitleText: PropTypes.string
  }),
  /**
   * Title of the table.
   * @deprecated Instead use the labels property
   */
  titleText: deprecatedPropType(PropTypes.string),
  /**
   * Subtitle of the table.
   * @deprecated Instead use the labels property
   */
  subtitleText: deprecatedPropType(PropTypes.string),
  /**
   * The column definition to apply to the table. Please check https://react-table.js.org/#/story/readme for more info
   Use the property "cellType" to define the different types of cell. Available values: "number" , "alpha-numeric" and "link.
   If the type is "link", in data use the structure {displayText: {text to display} ,url: {url} }.
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      headerText: PropTypes.string,
      accessor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
      ]),
      format: PropTypes.func,
      cellType: PropTypes.string,
      style: PropTypes.instanceOf(Object),
      fixed: PropTypes.string,
      Cell: PropTypes.instanceOf(Object),
      sortable: PropTypes.bool
    })
  ).isRequired,
  /**
   * Array with the data elements to show
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Boolean to show or hide the pagination controls
   */
  showPagination: PropTypes.bool,
  /**
   * Boolean to show or hide the page size control
   */
  showPageSize: PropTypes.bool,
  /**
   * Numeric value to control the page size selected
   */
  pageSize: PropTypes.number,
  /**
   * Callback to notify when the page size changes
   */
  onPageSizeChange: PropTypes.func,
  /**
   * Boolean to enable or disable the server side pagination mechanism
   */
  paginationServerSide: PropTypes.bool,
  /**
   * Numeric value to control the number of pages. Useful when Server side pagination data is enabled
   */
  pages: PropTypes.number,
  /**
   * Callback with receives the page info and should fetch the data to show on the table
   */
  onFetchData: PropTypes.func,
  /**
   * Boolean to enable or disable the sort mechanism
   */
  sortable: PropTypes.bool,
  /**
   * An object describing what column is sorted by default on the table
   */
  defaultSorted: PropTypes.instanceOf(Array),
  /**
   * Element to be shown in the expander.
   */
  subElementTemplate: PropTypes.func,
  /**
   * Property to be uses as unique row identifier. One of the fields of the data.
   */
  idForCheckbox: PropTypes.string,
  /**
   * Function to overwrite the existed getTrProps
   */
  getTrProps: PropTypes.func,
  /**
   * Boolean to bind config back to function or not
   */
  useRouter: PropTypes.bool,
  /**
   * Callback which receives the checked state of all items in the list
   */
  onSelection: PropTypes.func,
  /**
   * Ids of preselected items in the list
   */
  selections: PropTypes.arrayOf(PropTypes.any),
  /**
   *  Secondary actions listed in menu dropdown. Label is displayed and action is executed on click.
   */
  secondaryActions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      action: PropTypes.func
    })
  )
};

Table.defaultProps = {
  className: "",
  id: undefined,
  titleText: undefined,
  subtitleText: undefined,
  labels: {
    titleText: "",
    subtitleText: ""
  },
  showPagination: true,
  showPageSize: true,
  pageSize: undefined,
  onPageSizeChange: () => {},
  paginationServerSide: false,
  pages: undefined,
  onFetchData: () => {},
  sortable: true,
  defaultSorted: [],
  subElementTemplate: null,
  idForCheckbox: "",
  getTrProps: undefined,
  useRouter: false,
  selections: undefined,
  onSelection: () => {},
  secondaryActions: null
};

export default Table;
