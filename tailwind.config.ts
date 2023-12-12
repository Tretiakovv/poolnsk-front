import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                "main": {
                    "black": "#101010",
                    "white": "#FFFFFF",
                    "blue": "#0F8FEB"
                },
                "second": {
                    "light-blue": "#F2F6F9",
                    "gray": "#9EAFBB",
                    "gray-selected": "#1F1F1F"
                },
                "indicator": {
                    "new": "#18E1A5",
                    "delete": "#F94464"
                }
            },
            gridTemplateColumns: {
                '15': 'repeat(15, minmax(0, 1fr))',
            }
        },
    },
    plugins: [],
}
export default config
