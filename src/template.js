import { config, favicoPath, cssPath } from "./utils.js";
import path from "node:path";
const template = (html) => {
  const htm = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="keywords" content="${config.metadata.keywords.join(",")}">
        <meta name="description" content="${config.metadata.description}}">
        <script src="https://kit.fontawesome.com/50c925d5df.js" crossorigin="anonymous"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
        />
        <link
        href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
        rel="stylesheet"
        />
        <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap"
        rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/highlight.min.js"></script>
        <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
        />
        <link rel="stylesheet" href="https://cdn.simplecss.org/simple.min.css">
         <link rel="shortcut icon" href="../../public/favicon.ico" type="image/x-icon">
        <title>${config.metadata.title}</title>
        
    </head>
    <body>
        <div id="root">${html}</div>
        <script type="module" src="./index.js"></script>
    </body>
    </html>
    
    `;
  return htm;
};

export default template;
