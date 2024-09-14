
//Use this file to expose or render dom elements such as dynamic nav, buttons, imageLists etc.
import "@assets/css/main.css";
import "@src/app/routing/router";
import { ButtonComponent } from "@assets/styledComponents/atoms/atoms";
import { ImageList } from "@assets/styledComponents/molecules/molecules";
import {NavBar} from "@assets/styledComponents/organisms/organisms"
import {setHtmlElementInnerContent } from "@utils/utils";
import {img_utils} from "@utils/data.utils";

//import components to be exposed in the dom
const buttonComponent = new ButtonComponent();
const navBarComponent = new NavBar();
const imageListComponent = new ImageList();

/*Use customer method setHtmlElementInnerContent to expose your contents by passing in 
 the dom element and the template to render*/

//Render Navbar
export default function Initializer(){

const selectNavbar = document.getElementById('dy-navbar');
setHtmlElementInnerContent(
    {
        elem:selectNavbar, 
        template:`${navBarComponent.render()}`,
    });

    //Render ImageList
    const imageListContainer = document.getElementById('dy-tool-stand');
    setHtmlElementInnerContent(
        {
            elem:imageListContainer, 
            template:`${imageListComponent.render(img_utils)}`,
        }); 

    }
