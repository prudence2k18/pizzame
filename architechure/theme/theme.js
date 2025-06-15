export const Theme = {
  colors: {
    brand: {
      primary: "#2182BD",
      secondary: "#5282BD",
      muted: "#C6DAF7",
      contrast: "#FFFFFF", // Added for text on colored backgrounds
    },
    ui: {
      primary: "#F76E11",
      secondary: "#FF9F45",
      tertiary: "#FFBC80",
      quaternary: "#F9E4D4",
      disabled: "#D3D3D3",
      error: "#EB1D36",
      success: "#2B7A0B",
      warning: "#FFC107", // Added for warning states
    },
    bg: {
      primary: "#FFFFFF",
      secondary: "#EAF6F6",
      surface: "#F8F9FA", // Added for card surfaces
    },
    text: {
      primary: "#100F0F",
      secondary: "#0F3D3E",
      disabled: "#6C757D", 
      inverse: "#FFFFFF", // Pure white for dark backgrounds
      error: "#DC3545", // Standard Bootstrap error red
      success: "#28A745", // Standard Bootstrap success green
      onPrimary: "#FFFFFF", // Text color on primary buttons
      onSecondary: "#000000", // Text color on secondary buttons
    },
  },
  spacing: {
    none: 0,
    xxs: 4,
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 64,
    xxl: 128,
  },
  sizes: {
    icon: 24, // Standard icon size
    buttonHeight: 48, // Standard button height
    inputHeight: 40, // Standard input height
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 16,
      xl: 24,
      pill: 40,
      circle: 9999,
    },
  },
  fonts: {
    family: {
    body: "Inter_400Regular",
    heading: "Inter_700Bold",
    monospace: "RobotoMono_400Regular"
  },
    weight: {
      thin: 100,
      extraLight: 200,
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
    },
    size: {
      caption: 12,
      button: 14,
      body: 16,
      lead: 20,
      title: 24,
      h5: 28,
      h4: 32,
      h3: 40,
      h2: 48,
      h1: 56,
    },

    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      loose: 1.8,
    },
  },
  shadows: {
    sm: "0 1px 3px rgba(0,0,0,0.12)",
    md: "0 4px 6px rgba(0,0,0,0.1)",
    lg: "0 10px 15px rgba(0,0,0,0.1)",
    xl: "0 20px 25px rgba(0,0,0,0.1)",
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  },
  transitions: {
    fast: "0.15s ease",
    normal: "0.3s ease",
    slow: "0.5s ease",
  },
};
