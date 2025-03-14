import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvCheckBoxGroup", {
  root: {
    display: "inline-block",
    padding: 0,
    margin: 0,
    overflow: "hidden",
    verticalAlign: "top",
  },
  label: { marginBottom: theme.space.xs },
  group: { display: "flex" },
  vertical: {
    flexDirection: "column",

    // Prevent the focus ring to be hidden by sibling hover background
    "&>*": {
      zIndex: 0,
    },
    "&>*:focus-within": {
      zIndex: 1,
    },
  },
  horizontal: {
    flexDirection: "row",
    flexWrap: "wrap",

    "&>*:not(:first-of-type)": {
      marginLeft: theme.space.sm,
    },
  },
  invalid: {
    paddingBottom: theme.space.xs,
    borderBottom: `1px solid ${theme.colors.negative}`,
  },
  selectAll: {},
  error: {},
});
