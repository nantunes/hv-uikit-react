import { css, cx } from "@emotion/css";
import {
  HvLoading,
  HvLoadingProps,
  theme,
  useTheme,
  hexToRgbA,
} from "@hitachivantara/uikit-react-core";

const classes = {
  root: css({
    position: "relative",
    height: "inherit",
  }),
  loading: css({
    position: "absolute",
    inset: 0,
    zIndex: `calc(${theme.zIndices.banner} - 1)`,
  }),
  opaque: css({
    backgroundColor: theme.colors.atmo1,
  }),
  transparent: css({
    backgroundColor: "transparent",
  }),
};

export interface LoadingContainerProps extends HvLoadingProps {
  label?: string;
  loading?: boolean;
  opaque?: boolean;
  transparent?: boolean;
}

export const LoadingContainer = ({
  children,
  className,
  label,
  loading = false,
  opaque = false,
  transparent = false,
  ...others
}: LoadingContainerProps) => {
  const { colors } = useTheme();

  return (
    <div className={classes.root}>
      <HvLoading
        role="progressbar"
        className={cx(
          css({ backgroundColor: hexToRgbA(colors?.atmo1) }),
          classes.loading,
          className,
          {
            [classes.opaque]: opaque,
            [classes.transparent]: transparent,
          }
        )}
        label={label}
        hidden={!loading}
        {...others}
      />
      {children}
    </div>
  );
};
