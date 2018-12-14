# NPM Package Snippet

> NPM Package Snippet for Visual Studio Code

## Install

- [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items/gunturpoetra.npm-package-snippet)


## Features

- **Configurable Prefix**
- **Configurable Style**<br>
    Configurable style for semicolon (`;`), single quote (`'`) or double quote (`"`)
- **Recursively**<br>
    Walking up `package.json` file, starting from opened current file in the editor.
- **Configurable Language**<br>
    Running snippet on another language (e.g: `markdown`).


## Usage

| Module     | Prefix / Hint        |
|------------|----------------------|
| Common JS  | `pkg-req:<moduleId>` |
| ES Module  | `pkg-imp:<moduleId>` |
| Typescript | `pkg-ts:<moduleId>`  |


## Default Configuration

> After changed snippet configuration, restart the editor.

```json
{
    "snippet.npm-package.filename": "",
    "snippet.npm-package.semicolon": true,
    "snippet.npm-package.prefix.cjs": "pkg-req:",
    "snippet.npm-package.prefix.esm": "pkg-imp:",
    "snippet.npm-package.prefix.ts": "pkg-ts:",
    "snippet.npm-package.quotes": "single",
    "snippet.npm-package.languages": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact"
    ],
}
```


### Schema

- filename: `<string>`
    - required: `true`
    - example:
    ```json
    {
        "snippet.npm-package.filename": "<your-snippet-filename>.code-snippets",
    }
    ```

- quotes: `<string>`
    - enum: `single | double`
    - example:
    ```json
    {
        "snippet.npm-package.quotes": "single",
        "snippet.npm-package.quotes": "double",
    }
    ```


## License

MIT © [Guntur Poetra](https://github.com/iguntur)
