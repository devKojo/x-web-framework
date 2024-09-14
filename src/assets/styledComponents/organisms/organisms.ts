import { ImageComponent } from "../atoms/atoms";
import { NavLinkList } from "../molecules/molecules";

const navList = {
    id: 'site-primary-navigation',
    linkList: [
        {
            id: 'docs',
            label: 'Docs',
            href: '/docs'
        },
        {
            id: 'github',
            label: 'Github',
            href: '#'
        },
        {
            id: 'templates',
            label: 'Templates',
            href: '/templates'
        },
        {
            id: 'contact',
            label: 'Contact',
            href: '/contact'
        }
    ]
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
