import { theme as origTheme, extendTheme } from '@chakra-ui/react';
const theme = extendTheme({
  fonts: {
    body: `'Ticketing', sans-serif`,
    heading: `'Circular Abstracts', sans-serif`
  },
  styles: {
    global: (props) => ({
      body: {
        bg: 'var(--lightblue)',
        py: 4,
        color: 'var(--textyellow)',
        fontSize: 'xl'
      }
    })
  },
  components: {
    Alert: {
      variants: {
        solid: (props) => {
          const { colorScheme: c } = props;
          if (c == 'green') {
            return {
              container: {
                bg: 'var(--yellow)',
                color: 'var(--purple)'
              }
            };
          }
          if (c == 'red') {
            return {
              container: {
                bg: 'var(--red)'
              }
            };
          } else {
            return origTheme.components.Alert.variants!.subtle(props);
          }
        }
      }
    },
    Button: {
      baseStyle: {
        color: '--(textyellow)',
        bg: 'var(--red)'
      },
      variants: {
        base: {}
      },
      defaultProps: {
        variant: 'base'
      },
      sizes: {
        md: {
          fontSize: 'xl',
          fontWeight: 300
        }
      }
    }
  }
});
export default theme;
