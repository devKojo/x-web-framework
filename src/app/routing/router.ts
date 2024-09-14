import FullPageRouter  from "./utils";
 //define static routes
  const routes = {
    "/": "index.html",
    "/docs": "docs.html",
    "/templates": "templates.html",
    "/about": "about.html",
    "/contact": "contact.html",
    // Other routes...
};

 // Initialize Router
new FullPageRouter(routes);

    /*
Anchor Tags: Anchor elements (e.g., <a href="/about" data-route>About</a>).
Buttons: Buttons navigation by setting the data-href attribute. 
For example:<button data-href="/about" data-route>Go to About</button> 
    */