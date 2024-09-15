import { HtmlElementInnerContentType, Link, RouteMap } from "../types/types";


export const setHtmlElementInnerContent = (content: HtmlElementInnerContentType) => {
    const { elem, template} = content;
    if (elem === null) return '';
    elem.innerHTML += template;
};




/**
 * Utility function to generate a link list from a route map.
 * @param routes - The route map object containing paths as keys and filenames as values.
 * @param extraLinks - Optional extra links to append to the generated link list.
 * @returns Array of Link objects
 */
export function generateLinkList(routes: RouteMap, extraLinks: Link[] = []): Link[] {
    const linkList: Link[] = Object.keys(routes).reduce((acc: Link[], route) => {
        if (route !== "*") {
            const label = route === "/" ? "Home" : route.replace("/", "").charAt(0).toUpperCase() + route.slice(2);
            acc.push({
                id: label.toLowerCase(),
                label: label,
                href: route
            });
        }
        return acc;
    }, []);

    // Append any extra links if provided
    return linkList.concat(extraLinks);
}