import { ImageComponentPropType, NavLinkListPropType } from "../../../types/types";
import { ButtonComponent, ImageComponent } from "../atoms/atoms";


const buttonComponent = new ButtonComponent();
export class NavLinkList{
    public render(props:NavLinkListPropType):string{
        const {id, linkList} = props;

        let createNavList = `<ul class='dy-nav-link-list dy-nav-link-list--h-list' data-id='${id}'>`;
       linkList.forEach(({id, label, href}) => {
               createNavList = createNavList +=  `<li data-id='${id}'>${buttonComponent.render({id: id, label:label.toUpperCase(), href:href, type:'link'})}</li>`
        });
        return createNavList+"</ul>";

    }
}


const imageComponent = new ImageComponent();
export  class ImageList{
    public render(props:ImageComponentPropType[]){
        let createImageList = "<ul class='dy-image-list__list'>";
        props.forEach(({id, src, alt, width, height})=>{
            createImageList = createImageList += `<li class='dy-image-list__image'>${imageComponent.render({id: id, src: src, alt: alt, width: width, height: height})}</li>`
        });
        return createImageList+"</ul>"
    }
}


