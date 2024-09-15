import { generateLinkList } from "@utils/utils";
import { ImageComponent } from "../atoms/atoms";
import { NavLinkList } from "../molecules/molecules";
import {routes} from "@app/routing/routes";


const navList = {
    id: 'site-primary-navigation',
    linkList: generateLinkList(routes)
}

const imageComponent = new ImageComponent();
const navLinkList = new NavLinkList();


export class NavBar{
    render(){
        const {id, linkList} = navList;
        return`
            <div class='dy-navbar__inner'>
                ${imageComponent.render({id: 'site-logo', src:'', alt:'Site logo', width:'', height: ''})}
                ${navLinkList.render({id:id, linkList:linkList})}
            </div>
        `
    }
}
