export const COLORS = {
    blue: '#0d6efd',
    indigo: '#6610f2',
    purple: '#6f42c1',
    pink: '#d63384',
    red: '#dc3545',
    orange: '#fd7e14',
    yellow: '#ffc107',
    green: '#198754',
    teal: '#20c997',
    cyan: '#0dcaf0',
    black: '#000',
    white: '#fff',
    gray: '#6c757d',
    gray_dark: '#343a40',
    gray_100: '#f8f9fa',
    gray_200: '#e9ecef',
    gray_300: '#dee2e6',
    gray_400: '#ced4da',
    gray_500: '#adb5bd',
    gray_600: '#6c757d',
    gray_700: '#495057',
    gray_800: '#343a40',
    gray_900: '#212529',
    primary: '#1F1F1F',
    secondary: '#333333',
    success: '#198754',
    info: '#0dcaf0',
    warning: '#ffc107',
    danger: '#dc3545',
    light: '#f8f9fa',
    dark: '#212529'
};

export const SIZES = {
    base: 8,
    small: 12,
    font: 14,
    medium: 16,
    large: 18,
    extraLarge: 24,
}

export const FONTS = {
    bold: 'BarlowBold',
    semiBold: 'BarlowSemiBold',
    medium: 'BarlowMedium',
    regular: 'BarlowRegular',
}

export const SHADOWS = {
    light: {
        shadowColor: COLORS.gray,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    medium: {
        shadowColor: COLORS.gray,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    dark: {
        shadowColor: COLORS.gray,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,

        elevation: 14,
    },
}

export const assets = {
    placeholder: require('../assets/images/placeholder.jpg'),
    login: require('../assets/video/networkBg.mp4'),
    logo: require('../assets/images/logo.png'),
    arrow: require('../assets/images/arrow.png'),
}
