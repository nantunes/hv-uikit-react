import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "@core/utils/focusUtils";

import { createClasses } from "@core/utils/classes";

const name = "HvVerticalScrollListItem";

export const { staticClasses, useClasses } = createClasses(name, {
  root: {
    padding: "0",
    height: "32px",
    width: "32px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  notSelected: {
    height: "4px",
    width: "4px",
    borderRadius: "50%",
    display: "inline-block",
    backgroundColor: theme.colors.secondary_60,
  },
  text: {
    height: "16px",
    width: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "16px",
    width: "16px",
    borderRadius: "50%",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.colors.containerBackgroundHover,

      "& $notSelected": {
        height: "6px",
        width: "6px",
        backgroundColor: theme.colors.secondary,
      },
    },
    "&:focus": {
      outline: "none",
    },
    "&:focus-visible": {
      ...outlineStyles,
    },
  },
});
