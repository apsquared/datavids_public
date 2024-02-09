// https://www.remotion.dev/docs/google-fonts/

import * as Montserrat from "@remotion/google-fonts/Montserrat";
import * as Roboto from "@remotion/google-fonts/Roboto";
import * as Poppins from "@remotion/google-fonts/Poppins"
import * as CrossaintOne from "@remotion/google-fonts/CroissantOne"

export function getValidFonts() {
  return ['montserrat' , 'roboto' , 'poppins' , 'crossaintone'];
} 


export function getFont(fontName:string | undefined):string{

  if (!fontName)
    return Montserrat.loadFont().fontFamily;

  fontName = fontName.toLowerCase();
  if (fontName=="montserrat"){
    return Montserrat.loadFont().fontFamily;
  }
  else if (fontName=="roboto"){
    return Roboto.loadFont().fontFamily;
  }
  else if (fontName=="poppins"){
    return Poppins.loadFont().fontFamily;
  }  else if (fontName=="crossaintone"){
    return CrossaintOne.loadFont().fontFamily;
  }  
  else {
    console.log("Unknown font: "+fontName);
    return Montserrat.loadFont().fontFamily;
  }
}

