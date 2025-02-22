/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
	  extend: {
		fontFamily: {
		  poppins: ['Poppins', 'Arial', 'Helvetica', 'sans-serif'], // Default font
		  geistSans: ['var(--font-geist-sans)', 'sans-serif'],      // GeistSans font
		  geistMono: ['var(--font-geist-mono)', 'monospace'],       // GeistMono font
		},
		colors: {
		  background: 'var(--background)',
		  foreground: 'var(--foreground)',
		},
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)',
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
};
