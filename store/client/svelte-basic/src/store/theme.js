import { readable } from "svelte/store";

const colorScheme = {
  main: {
    background: "#212121",
    lightText: "#e9d8a4",
    darkText: "#E5CC83",
  },
};

function colorThemeReducer() {
  let themeReducedString = Object.entries(colorScheme).reduce(
    (str, [section, values]) => {
      let stringReducedSection = sectionToColorStringReducer(values, section);
      return (str += stringReducedSection);
    },
    ""
  );
  const { subscribe } = readable(themeReducedString);
  return {
    subscribe,
  };
}

const sectionToColorStringReducer = (values, section) =>
  Object.entries(values).reduce((str, [key, value]) => {
    return (str += `--clr-${section}-${key}: ${value}; `);
  }, "");

export const theme = colorThemeReducer();
