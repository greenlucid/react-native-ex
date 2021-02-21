import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    textBar: '#ffffff',
    primary: '#0366d6',
    barBackground: '#24292e',
    cardBackground: '#ffffff',
    tagBackground: '#2288ff',
    background: '#dddddd',
    error: '#ee0f0f'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    bar: 20,
    title: 20,
    tag: 18
    },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  margins: {
    appbar: 10
  }
};

export default theme;