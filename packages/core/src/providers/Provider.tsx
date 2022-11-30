import { css, Global } from "@emotion/react";
import { CssBaseline, theme } from "@hitachivantara/uikit-styles";
import { useTheme } from "../hooks";

interface ProviderProps {
  children?: React.ReactNode;
  enableCssBaseline?: boolean;
}

const Provider = ({ enableCssBaseline = true, children }: ProviderProps) => {
  const { themesVars, setThemeAttrs } = useTheme();

  setThemeAttrs();

  return (
    <>
      <Global
        styles={css`
          ${enableCssBaseline && CssBaseline}
          ${themesVars}
          body {
            background: ${theme.colors.atmo2};
            transition: background 0.5s ease-out;
          }
        `}
      />
      {children}
    </>
  );
};

export default Provider;

if (process.env.NODE_ENV !== "production") {
  Provider.displayName = "Provider";
}
