import Initializer from "@src/main";

const baseUrl = process.env.BASE_URL;
const dist = `${baseUrl}/pages`;

export default class FullPageRouter {
    private cacheName = 'static-html-cache'; // Cache name for storing static HTML pages
    private routes: { [key: string]: string } = {}; // Route map for static HTML pages
    private notFoundPage = `${dist}/404.html`; // Path to the static 404 page
    private indexPage = `${baseUrl}/index.html`; // Index page (in the root directory)

    constructor(routes: { [key: string]: string }) {
        this.routes = routes;
        this.preloadStaticPages(); // Cache all static pages on initialization
        this.addClickListeners();  // Set up event listeners for routing
        this.handlePopState();     // Handle back and forward navigation
    }

    // Preload and cache all static pages on initialization
    private async preloadStaticPages() {
        const cacheKeys = Object.keys(this.routes)
            .map(route => `${dist}/${this.routes[route]}`)
            .concat([this.notFoundPage, this.indexPage]);

        try {
            const cache = await caches.open(this.cacheName);
            await Promise.all(
                cacheKeys.map(async (pageUrl) => {
                    try {
                        const response = await fetch(pageUrl);
                        if (response.ok) {
                            await cache.put(pageUrl, response);
                        } else {
                            console.warn(`Error fetching page: ${pageUrl}`);
                        }
                    } catch (err) {
                        console.warn(`Error caching page ${pageUrl}:`, err);
                    }
                })
            );
        } catch (err) {
            console.error("Error opening cache:", err);
        }
    }

    // Set up event listeners for route clicks (using event delegation)
    private addClickListeners() {
        document.addEventListener("click", (event) => {
            const target = event.target as HTMLElement;
            if (target && this.isRouteElement(target)) {
                event.preventDefault();  // Prevent default browser navigation
                const href = (target as HTMLAnchorElement).getAttribute("href");
                if (href) {
                    this.navigateToPage(href);  // Route the user to the page
                }
            }
        });
    }

    // Verify if the element is a valid route element (links, buttons, etc.)
    private isRouteElement(element: HTMLElement): boolean {
        return (
            element.matches("[data-route]") || // Matches elements with 'data-route' attribute
            (element.tagName === "A" && !!element.getAttribute("href")) || // Anchor elements with href attribute
            (element.tagName === "BUTTON" && !!element.getAttribute("data-href")) // Buttons with 'data-href' attribute
        );
    }

    // Handle navigation to a specific page
    private async navigateToPage(url: string) {
        const normalizedUrl = this.normalizeUrl(url);

        let pageUrl: string;
        if (this.routes[normalizedUrl]) {
            pageUrl = this.routes[normalizedUrl] === 'index.html'
                ? `${baseUrl}/${this.routes[normalizedUrl]}`
                : `${dist}/${this.routes[normalizedUrl]}`;
        } else if (normalizedUrl === "/" || normalizedUrl === "") {
            pageUrl = this.indexPage;
        } else {
            this.show404Page();
            return;
        }

        // Fetch or use cached page
        const cachedResponse = await caches.match(pageUrl);
        if (cachedResponse) {
            const html = await cachedResponse.text();
            this.updatePage(html);
        } else {
            await this.fetchAndUpdatePage(pageUrl);
        }

        // Update history and current URL
        history.pushState({ url: normalizedUrl }, '', url);
    }

    // Fetch and update page content
    private async fetchAndUpdatePage(pageUrl: string) {
        try {
            const response = await fetch(pageUrl);
            if (response.ok) {
                const html = await response.text();
                // Cache the response
                const cache = await caches.open(this.cacheName);
                cache.put(pageUrl, response);
                this.updatePage(html); // Update the page with the new HTML
            } else {
                throw new Error("Page not found");
            }
        } catch (error) {
            console.error("Navigation error:", error);
            this.show404Page(); // Show 404 page if fetch fails
        }
    }

    // Update the page content with the new HTML
    private updatePage(html: string) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newBody = doc.body;

        // Replace page content
        document.body.innerHTML = newBody.innerHTML;

        // Re-bind event listeners after content is loaded
        this.addClickListeners();

        // Re-initialize dynamic content if needed
        this.initializeDynamicContent();
    }

    // Show the 404 page if the route does not exist
    private async show404Page() {
        const cachedResponse = await caches.match(this.notFoundPage);
        if (cachedResponse) {
            const html = await cachedResponse.text();
            this.updatePage(html);
        } else {
            // If 404 page is not cached, fetch it
            this.fetchAndUpdatePage(this.notFoundPage);
        }
    }

    // Normalize URL to avoid issues with trailing slashes and relative paths
    private normalizeUrl(url: string): string {
        return url.replace(/\/$/, ''); // Remove trailing slash if present
    }

    // Handle back and forward navigation
    private handlePopState() {
        window.addEventListener('popstate', (event) => {
            const state = event.state as { url?: string };
            const url = state?.url || window.location.pathname;
            this.navigateToPage(url);
        });
    }

    // Re-initialize dynamic content (to be customized based on your specific needs)
    private initializeDynamicContent() {
        Initializer(); // Call the Initializer function to set up dynamic content
        // You can add more initializations as needed
    }
}
