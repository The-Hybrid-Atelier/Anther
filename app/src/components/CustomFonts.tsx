import {Global} from "@mantine/core";
import nunito from '../assets/fonts/Nunito-VariableFont_wght.ttf'
import gilroyBold from '../assets/fonts/Gilroy-Bold.otf'
import gilroyReg from '../assets/fonts/Gilroy-Regular.otf'
import gilroyThin from '../assets/fonts/Gilroy-Thin.otf'

function CustomFonts() {
  return (
    <Global styles={[
      {
        '@font-face': {
          fontFamily: 'Nunito',
          src: `url('${nunito}') format("trueType")`,
          fontStyle: 'normal',
        },
      },
      {
        '@font-face': {
          fontFamily: 'Gilroy',
          src: `url('${gilroyReg}') format("openType")`,
          fontWeight: 500,
          fontStyle: 'normal',
        },
      },
      {
        '@font-face': {
          fontFamily: 'Gilroy',
          src: `url('${gilroyThin}') format("openType")`,
          fontWeight: 300,
          fontStyle: 'normal',
        },
      },
      {
        '@font-face': {
          fontFamily: 'Gilroy',
          src: `url('${gilroyBold}') format("openType")`,
          fontWeight: 700,
          fontStyle: 'normal',
        },
      },
    ]}/>
  );
}

export default CustomFonts;
