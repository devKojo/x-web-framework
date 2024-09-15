import FullPageRouter from "./router.utils";
 const routes =  require("../routes");



 // Initialize Router
new FullPageRouter(routes.routes);
    /*
Anchor Tags: Anchor elements (e.g., <a href="/about" data-route>About</a>).
Buttons: Buttons navigation by setting the data-href attribute. 
For example:<button data-href="/about" data-route>Go to About</button> 
    */

