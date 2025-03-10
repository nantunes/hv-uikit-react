import { useContext } from "react";

import { HvBaseProps } from "@core/types/generic";
import { setId } from "@core/utils/setId";
import { HvInput, HvInputProps } from "@core/components/Input";
import { ExtractNames } from "@core/utils/classes";

import { useClasses, staticClasses } from "./LeftControl.styles";
import { HvControlsContext } from "../context/ControlsContext";

export { staticClasses as leftControlClasses };

export type HvLeftControlClasses = ExtractNames<typeof useClasses>;

export interface HvLeftControlProps extends HvBaseProps {
  /** if `true` the hide sort by dropdown is not rendered */
  hideSearch?: boolean;
  /** placeholder of the input */
  placeholder?: string;
  /** Callback called when a search action occurs */
  onSearch?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => void;
  /** Extra props passed to input */
  searchProps?: HvInputProps;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvLeftControlClasses;
}

export const HvLeftControl = ({
  id,
  classes: classesProp,
  className,
  children,
  placeholder = "Search",
  onSearch,
  hideSearch = false,
  searchProps,
  ...others
}: HvLeftControlProps) => {
  const { classes, cx } = useClasses(classesProp);

  const { onSearch: onSearchHandler } = useContext(HvControlsContext);

  const onChangeFilter: HvInputProps["onChange"] = (e, value) => {
    onSearch?.(e, value);
    onSearchHandler?.(value);
  };

  return (
    <div id={id} className={cx(classes.root, className)} {...others}>
      {!hideSearch && (
        <HvInput
          id={setId(id, "search-input")}
          type="search"
          placeholder={placeholder}
          onChange={onChangeFilter}
          {...searchProps}
        />
      )}
      {children}
    </div>
  );
};
