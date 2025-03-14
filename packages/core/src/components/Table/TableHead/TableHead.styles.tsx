import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvTableHead", {
  root: {},
  stickyHeader: { position: "sticky", zIndex: 3, top: 0 },
});
