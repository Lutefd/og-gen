const css = (dark: boolean) => `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

@font-face {
    font-family: 'JetBrains Mono';
}

*{
    margin: 0;
    padding: 0;
}

body {
    font-family: 'JetBrains Mono', monospace;
    height: 100vh;
    width: 100vw;
    --webkit-font-smoothing: antialiased;
    --moz-osx-font-smoothing: grayscale;
    ${
      dark
        ? `
    background: black;
    color: #fafafa;
    `
        : `
        background: white;
        color: hsl(20, 14.3%, 4.1%);
        `
    }
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width:100%
        height: 100%;
    }
    .title{
        opacity: 0.9;
        font-size: 9em;
        font-weight: 700;
        line-height: 1.2;      
    }
    .description{
        margin-left: 4px;
        margin-top: 10px;
        font-size: 2.8rem;
        font-weight: 500;
        line-height: 1
    }
    
`;

export function getHtml({
  title,
  description,
  dark = true,
}: {
  title: string;
  description?: string;
  dark?: boolean;
}) {
  return `
    <!DOCTYPE html>
    <html>
      <meta charset="utf-8">
      <title>Lutefd OG</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            ${css(dark)}
        </style>
        <body>
            <div class="container">
                <h1 class="title">${title}</h1>
                ${
                  description
                    ? `<h2 class="description">${description}</h2>`
                    : ``
                }
            </div>
        </body>
    </html>
    `;
}
