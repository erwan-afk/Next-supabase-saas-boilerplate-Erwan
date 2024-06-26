import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily :{ 
				PPNeueBit: ["PPNeueBit","sans-serif"], 
				RocGrotesk: ["Roc-grotesk","sans-serif"]
			},
			colors: {
				fasleblack:'#0E0E0E',
				goldyellow:'#FFBA00',
				goldyellowhover:'rgba(255, 186, 0, 0.25);',
				white:'#FAFAFA',
				grey:{
					100:'#D9D9D9',
					200:'#B6B6B6',
					300:'#989898',
					400:'#676767',
					500:'#474747',
					600:'#242424',
				},
				blur: {
					DEFAULT: 'rgba(255, 255, 255, 0.05)', // Couleur de fond avec filtre de flou
					'backdrop-filter': 'blur(30px)', // Filtre de flou de 30px avec backdrop-filter
				  },

		
				blur10:'rgba(255, 255, 255, 0.1);',
				voltred:'#FF5050',
				goldgradient:{
					dark:'#FFA800',
					light:'#FFB800'
				}
			},
			fontSize: {
				12: '0.75rem',
				16: '1rem',
				20: '1.25rem',
				24: '1.5rem',
				30: '1.875rem',
				32: ' 2rem',
				36: '2.25rem',
				40: '2.5rem',
				48: '3rem',
				50: '3.125rem',
				64: '4rem',

			},
			dropShadow: {
				'glowlight': '0px 0px 30px rgba(255, 184, 0, 0.3)',
				'glow': '0px 0px 30px rgba(255, 184, 0, 0.7)',
				'glowred': '0px 0px 30px rgba(255, 0, 0, 0.9)',
			},
			spacing: {
				5: '5px',
				8: '8px',
				10: '10px',
				15: '15px',
				20: '20px',
				25: '25px',
				50: '50px',
				70: '70px',
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
				8: '8px',
				16: '16px',
			},
			transitionDuration: {
				DEFAULT: '150ms',
				75: '75ms',
				100: '100ms',
				150: '150ms',
				200: '200ms',
				300: '300ms',
				500: '500ms',
				700: '700ms',
				1000: '1000ms',
			},
			transitionProperty: {
				none: 'none',
				all: 'all',
				DEFAULT:
					'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
				colors: 'color, background-color, border-color, text-decoration-color, fill, stroke',
				opacity: 'opacity',
				shadow: 'box-shadow',
				transform: 'transform',
			},
			backgroundImage: {
				'render': "url('/RENDER_1-20-1.png')",
				'achat': "url('/bg-card-achat.png')",
				'background': "url('/pixel-background-app.png')",
				'touche': "url('/btn_black.png')",
			},
			gridAutoRows: {
				'auto': 'auto',
			  },
			  gridTemplateRows: {
				'layout': 'auto 1fr',
			  },
			  
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				fade: {
					from: {
						opacity: "0",
					},
					to: {
						opacity: "1",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				fade: "fade 1s linear forwards",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
