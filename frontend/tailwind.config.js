/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Share Tech Mono"', '"Courier New"', 'monospace'],
        hud: ['Orbitron', '"Share Tech Mono"', 'monospace'],
        sans: ['"Share Tech Mono"', 'monospace'],
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
        DEFAULT: '2px',
        md: '2px',
        lg: '4px',
        xl: '4px',
        '2xl': '4px',
        full: '9999px',
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
      },
      letterSpacing: {
        tactical: '0.15em',
        hud: '0.1em',
        wide: '0.05em',
      },
      colors: {
        background: 'oklch(var(--background) / <alpha-value>)',
        foreground: 'oklch(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT: 'oklch(var(--card) / <alpha-value>)',
          foreground: 'oklch(var(--card-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'oklch(var(--popover) / <alpha-value>)',
          foreground: 'oklch(var(--popover-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
          foreground: 'oklch(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
          foreground: 'oklch(var(--secondary-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
          foreground: 'oklch(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
          foreground: 'oklch(var(--accent-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
          foreground: 'oklch(var(--destructive-foreground) / <alpha-value>)',
        },
        border: 'oklch(var(--border) / <alpha-value>)',
        input: 'oklch(var(--input) / <alpha-value>)',
        ring: 'oklch(var(--ring) / <alpha-value>)',
        // Faction-specific color tokens
        faction: {
          primary: 'var(--faction-primary)',
          secondary: 'var(--faction-secondary)',
          accent: 'var(--faction-accent)',
          glow: 'var(--faction-glow)',
          border: 'var(--faction-border)',
          muted: 'var(--faction-muted)',
          text: 'var(--faction-text)',
          dim: 'var(--faction-dim)',
        },
        // Named faction palettes
        hev: {
          DEFAULT: 'oklch(68% 0.19 55)',
          dark: 'oklch(45% 0.14 55)',
          light: 'oklch(82% 0.18 55)',
        },
        hecu: {
          DEFAULT: 'oklch(58% 0.12 140)',
          dark: 'oklch(38% 0.09 140)',
          light: 'oklch(72% 0.13 140)',
        },
        security: {
          DEFAULT: 'oklch(55% 0.18 250)',
          dark: 'oklch(35% 0.14 250)',
          light: 'oklch(70% 0.18 250)',
        },
        resistance: {
          DEFAULT: 'oklch(65% 0.16 195)',
          dark: 'oklch(42% 0.12 195)',
          light: 'oklch(78% 0.15 195)',
        },
      },
      boxShadow: {
        'faction-sm': '0 0 4px var(--faction-glow)',
        'faction': '0 0 8px var(--faction-glow), 0 0 20px var(--faction-glow)',
        'faction-lg': '0 0 16px var(--faction-glow), 0 0 40px var(--faction-glow)',
        'critical': '0 0 12px oklch(55% 0.22 25 / 0.8)',
      },
      animation: {
        'stat-pulse': 'statPulse 2s ease-in-out infinite',
        'critical-pulse': 'criticalPulse 1s ease-in-out infinite',
        'warning-flash': 'warningFlash 1s ease-in-out infinite',
        'hazard-flash': 'hazardFlash 0.8s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.4s ease forwards',
        'slide-in-left': 'slideInLeft 0.3s ease forwards',
        'number-tick': 'numberTick 0.2s ease forwards',
        'heartbeat': 'heartbeat 1.2s ease-in-out infinite',
        'radar-sweep': 'radarSweep 3s linear infinite',
        'crt-flicker': 'crtFlicker 0.15s infinite',
        'scanline-scroll': 'scanlineScroll 8s linear infinite',
        'boot-crt': 'bootCrtOn 0.8s ease forwards',
        'lambda-reveal': 'lambdaReveal 1.5s ease forwards',
        'suit-voice': 'suitVoiceScroll 4s ease forwards',
      },
      keyframes: {
        statPulse: {
          '0%, 100%': { boxShadow: '0 0 4px var(--faction-glow)' },
          '50%': { boxShadow: '0 0 16px var(--faction-glow), 0 0 32px var(--faction-glow)' },
        },
        criticalPulse: {
          '0%, 100%': { boxShadow: '0 0 4px oklch(55% 0.22 25 / 0.6)', borderColor: 'oklch(55% 0.22 25 / 0.6)' },
          '50%': { boxShadow: '0 0 20px oklch(55% 0.22 25 / 0.9)', borderColor: 'oklch(65% 0.25 25)' },
        },
        warningFlash: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        hazardFlash: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(1.1)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        numberTick: {
          '0%': { opacity: '0.5', transform: 'translateY(-2px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '10%': { transform: 'scaleY(2.5)' },
          '20%': { transform: 'scaleY(0.8)' },
          '30%': { transform: 'scaleY(1.8)' },
          '40%': { transform: 'scaleY(1)' },
        },
        radarSweep: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        crtFlicker: {
          '0%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.97' },
          '94%': { opacity: '1' },
          '96%': { opacity: '0.98' },
          '100%': { opacity: '1' },
        },
        scanlineScroll: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100px' },
        },
        bootCrtOn: {
          '0%': { transform: 'scaleY(0.01) scaleX(1)', opacity: '0.8' },
          '30%': { transform: 'scaleY(0.01) scaleX(1)', opacity: '1' },
          '60%': { transform: 'scaleY(1) scaleX(1.05)', opacity: '0.9' },
          '100%': { transform: 'scaleY(1) scaleX(1)', opacity: '1' },
        },
        lambdaReveal: {
          '0%': { opacity: '0', transform: 'scale(0.5)', filter: 'blur(20px)' },
          '50%': { opacity: '1', transform: 'scale(1.1)', filter: 'blur(0px)' },
          '100%': { opacity: '1', transform: 'scale(1)', filter: 'blur(0px)' },
        },
        suitVoiceScroll: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '80%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-4px)', opacity: '0' },
        },
        bootBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    require('@tailwindcss/container-queries'),
  ],
};
