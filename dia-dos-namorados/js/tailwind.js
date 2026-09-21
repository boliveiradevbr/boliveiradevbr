tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        rose: {
                            400: '#fb7185',
                            500: '#f43f5e',
                            600: '#e11d48'
                        },
                        violet: {
                            400: '#a78bfa',
                            500: '#8b5cf6',
                            600: '#7c3aed'
                        },
                        emerald: {
                            400: '#34d399',
                            500: '#10b981'
                        }
                    },
                    fontFamily: {
                        mono: [
                            'JetBrains Mono',
                            'Fira Code',
                            'monospace'
                        ],
                        sans: [
                            'Inter',
                            'system-ui',
                            'sans-serif'
                        ]
                    },
                    animation: {
                        'float': 'float 6s ease-in-out infinite',
                        'float-slow': 'float 9s ease-in-out infinite',
                        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                        'blink': 'blink 1s step-end infinite',
                        'heart': 'heart 4s ease-in-out infinite',
                        'spin-slow': 'spin 8s linear infinite',
                        'terminal': 'terminal 2s ease-in-out infinite',
                        'gradient': 'gradient 8s ease infinite'
                    },
                    keyframes: {
                        float: {
                            '0%, 100%': {
                                transform: 'translateY(0px)'
                            },
                            '50%': {
                                transform: 'translateY(-18px)'
                            }
                        },
                        pulseGlow: {
                            '0%, 100%': {
                                boxShadow:
                                    '0 0 15px rgba(244,63,94,.25), 0 0 35px rgba(139,92,246,.10)'
                            },
                            '50%': {
                                boxShadow:
                                    '0 0 30px rgba(244,63,94,.55), 0 0 70px rgba(139,92,246,.25)'
                            }
                        },
                        blink: {
                            '50%': {
                                opacity: '0'
                            }
                        },
                        heart: {
                            '0%': {
                                transform: 'translateY(100vh) scale(.6)',
                                opacity: '0'
                            },
                            '10%': {
                                opacity: '.7'
                            },
                            '90%': {
                                opacity: '.2'
                            },
                            '100%': {
                                transform: 'translateY(-20vh) scale(1.2)',
                                opacity: '0'
                            }
                        },
                        terminal: {
                            '0%, 100%': {
                                opacity: '.5'
                            },
                            '50%': {
                                opacity: '1'
                            }
                        },
                        gradient: {
                            '0%, 100%': {
                                backgroundPosition: '0% 50%'
                            },
                            '50%': {
                                backgroundPosition: '100% 50%'
                            }
                        }
                    }
                }
            }
        }