import { SettingsObject } from "@types";
import { useEffect } from "react";

const useAppStyles = (settings: SettingsObject) => {
  useEffect(() => {
    const styles: HTMLStyleElement = document.getElementById(
      "app-styles"
    ) as HTMLStyleElement;
    if (styles) {
      const sheet = styles.sheet as CSSStyleSheet;
      const rule = `svg g.Icon {stroke: ${settings.color}}`;
      if (sheet.cssRules.length > 0) {
        sheet.deleteRule(0);
      }
      sheet.insertRule(rule, 0);
    }
  }, [settings.color]);
};

export { useAppStyles };
