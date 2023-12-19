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
                    "blue": "#0F8FEB",
                },
                "second": {
                    "light-blue": "#F2F6F9",
                    "gray": "#9EAFBB",
                    "border-gray" : "#F2F2F2",
                    "gray-selected": "#1F1F1F"
                },
                "indicator": {
                    "new": "#18E1A5",
                    "delete": "#F94464",
                    "green-light" : "#F0FCF0",
                    "red-light" : "#FFF2F2",
                    "text-green" : "#00C100",
                    "text-red" : "#FF0000"
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
