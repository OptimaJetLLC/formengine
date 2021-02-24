/* eslint-disable camelcase */
import MaterialCommunityIcons_ttf from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';

const IconsCSS = `
@font-face {
  src: url(${MaterialCommunityIcons_ttf});
  font-family: MaterialCommunityIcons;
}
`;

const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) style.styleSheet.cssText = IconsCSS;
else style.appendChild(document.createTextNode(IconsCSS));

document.head.appendChild(style);