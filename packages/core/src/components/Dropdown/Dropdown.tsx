import { useState, useRef, CSSProperties } from "react";

import { Typography } from "components";
import { useClickOutside } from "hooks";
import { themeVars } from "theme";

import { DropdownHeader } from "./Header";
import { DropdownList } from "./List";
import { DropdownListItem } from "./ListItem";
import { DropdownIcon } from "./Icon";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  value: string;
  options: DropdownOption[];
  onChange?: (value: string) => void;
  css?: CSSProperties;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  value,
  options,
  onChange,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(ref, () => {
    setIsOpen(false);
  });

  const onToggleHandler = () => {
    setIsOpen(!isOpen);
  };

  const onChangeHandler = (nextValue: string) => {
    setIsOpen(false);
    onChange?.(nextValue);
  };

  return (
    <div ref={ref} className={className} css={{ position: "relative" }}>
      <DropdownHeader isOpen={isOpen} onClick={onToggleHandler}>
        <Typography
          variant="label"
          css={{
            color: themeVars.colors.acce4,
          }}
        >
          {value}
        </Typography>
        <DropdownIcon />
      </DropdownHeader>
      {isOpen && (
        <DropdownList>
          {options.map((option) => (
            <DropdownListItem
              onClick={() => onChangeHandler(option.value)}
              key={option.value}
              isSelected={option.value === value}
            >
              <Typography variant="label">{option.label}</Typography>
            </DropdownListItem>
          ))}
        </DropdownList>
      )}
    </div>
  );
};

if (process.env.NODE_ENV !== "production") {
  Dropdown.displayName = "Dropdown";
}
