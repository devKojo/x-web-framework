export interface HtmlElementInnerContentType{
    elem: HTMLElement | null;
    template: string;
    btnId?: string;
    handler?: () => void;
}

export interface ButtonComponentPropType{
    id: string; //id must be unique to each button
    label?: string;
    icon?: HTMLElement | null;
    href?: string;
    type?: 'button' | 'link'
}
export interface ImageComponentPropType{
    id: string,
    alt: string,
    src: string,
    width: string | number,
    height: string | number,
}

type LinkListType = {
    id: string,
    label: string,
    href?: string
}
export interface NavLinkListPropType{
    id: string,
    linkList: LinkListType[]
}