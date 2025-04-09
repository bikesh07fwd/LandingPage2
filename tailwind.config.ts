// import type { Config } from "tailwindcss";

// export default {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//     },
//   },
//   plugins: [
//     addVariablesForColors,
//   ],
// } satisfies Config;

// function addVariablesForColors({ addBase, theme }: any) {
//   let allColors = flattenColorPalette(theme("colors"));
//   let newVars = Object.fromEntries(
//     Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
//   );
 
//   addBase({
//     ":root": newVars,
//   });
// }

import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    function addVariablesForColors({ addBase, theme }: any) {
      const allColors = theme("colors");
      const flattenColors = (colors: any, prefix = ""): Record<string, string> =>
        Object.entries(colors).reduce((acc, [key, value]) => {
          if (typeof value === "string") {
            acc[`${prefix}${key}`] = value;
          } else {
            Object.assign(acc, flattenColors(value, `${prefix}${key}-`));
          }
          return acc;
        }, {});

      const newVars = Object.fromEntries(
        Object.entries(flattenColors(allColors)).map(([key, val]) => [`--${key}`, val])
      );

      addBase({
        ":root": newVars,
      });
    },
  ],
} satisfies Config;
