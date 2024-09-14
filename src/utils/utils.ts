import { HtmlElementInnerContentType } from "../types/types";


export const setHtmlElementInnerContent = (content: HtmlElementInnerContentType) => {
    const { elem, template} = content;
    if (elem === null) return '';
    elem.innerHTML += template;
};



