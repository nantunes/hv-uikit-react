import { StandardProps, CheckboxProps } from "@material-ui/core";

export interface HvBaseCheckBoxProps extends StandardProps<CheckboxProps, HvBaseCheckBoxClassKey, "onChange"> {
  /**
   * Id to be applied to the root node.
   */
  id?: string;

  /**
   * The input name.
   */
  name?: string;
  /**
   * The value of the input.
   *
   * Is up to the application's logic when to consider the submition of this value.
   * Generaly it should be used only when the checkbox is neither unchecked nor indeterminate.
   *
   * The default value is "on".
   */
  value?: any;

  /**
   * Indicates that the input is disabled.
   */
  disabled?: boolean;
  /**
   * Indicates that the input is not editable.
   */
  readOnly?: boolean;
  /**
   * Indicates that user input is required.
   */
  required?: boolean;

  /**
   * If `true` the checkbox is selected, if set to `false` the checkbox is not selected.
   *
   * When defined the checkbox state becomes controlled.
   */
  checked?: boolean;
  /**
   * When uncontrolled, defines the initial checked state.
   */
  defaultChecked?: boolean;
  /**
   * If `true` the checkbox visualy shows the indeterminate state.
   */
  indeterminate?: boolean;

  /**
   * The callback fired when the checkbox is pressed.
   */
  onChange: (event: Event, checked: boolean, value: any) => void;

  /**
   * Whether the selector should use semantic colors.
   */
  semantic?: boolean;

  /**
   * Properties passed on to the input element.
   */
  inputProps: object;
}

export type HvBaseCheckBoxClassKey = "root" | "disabled";

export default function HvBaseCheckBox(props: HvBaseCheckBoxProps): JSX.Element | null;
