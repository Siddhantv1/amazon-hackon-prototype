
import type { Config } from "tailwindcss";

export default {
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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'bebas': ['"Bebas Neue"', 'cursive'],
			},
			colors: {
				'amazon-orange': '#FF9900',
				'amazon-black': '#000000',
				'amazon-blue': '#146EB4',
				'amazon-light-blue': '#45ACCB',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'scroll-up': {
					'0%': {
						transform: 'translateY(0)'
					},
					'100%': {
						transform: 'translateY(-50%)'
					}
				},
				'scroll-down': {
					'0%': {
						transform: 'translateY(-50%)'
					},
					'100%': {
						transform: 'translateY(0)'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'scale(1)' },
					'100%': { opacity: '0', transform: 'scale(0.95)' }
				},
				'fade-in-slow': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'waveform': {
					'0%, 100%': { height: '20%' },
					'25%': { height: '80%' },
					'50%': { height: '40%' },
					'75%': { height: '60%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'scroll-up': 'scroll-up 20s linear infinite',
				'scroll-down': 'scroll-down 20s linear infinite',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'fade-in-slow': 'fade-in-slow 3s ease-out',
				'waveform-1': 'waveform 1.2s ease-in-out infinite',
				'waveform-2': 'waveform 1.3s ease-in-out infinite 0.1s',
				'waveform-3': 'waveform 1.5s ease-in-out infinite 0.2s',
				'waveform-4': 'waveform 1.4s ease-in-out infinite 0.3s',
				'waveform-5': 'waveform 1.2s ease-in-out infinite 0.4s',
				'waveform-6': 'waveform 1.3s ease-in-out infinite 0.5s',
				'waveform-7': 'waveform 1.5s ease-in-out infinite 0.6s',
				'waveform-8': 'waveform 1.4s ease-in-out infinite 0.7s'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
