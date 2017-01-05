# Surrounding
Extension for Visual Studio Code to surround the selection with something configurated.

# Prepare
Open your workspace folder.

Open command palette with `cmd+shift+p` or `ctrl+shift+p`.

Run `Surrounding: Add default config file to .vscode directory`.

# Configure
See `.vscode/srrounding.json`

```
{
  "settings": [
    {
      "index": 0,
      "prefix": "{",
      "postfix": "}"
    },
    //...

```

Please configure your prefix and postfix. 
Example.

```
{
  "settings": [
    {
      "index": 0,
      "prefix": "<elem>",
      "postfix": "</elem>"
    },
    //...

```

| Index | Command name | Default keybind (Win) |
|:----:|:----|:----|
| 0 | extension.surrounding.command00 | ctrl+q ctrl+0 |
| 1 | extension.surrounding.command01 | ctrl+q ctrl+1 |
| 2 | extension.surrounding.command02 | ctrl+q ctrl+2 |
| 3 | extension.surrounding.command03 | ctrl+q ctrl+3 |
| 4 | extension.surrounding.command04 | ctrl+q ctrl+4 |
| 5 | extension.surrounding.command05 | ctrl+q ctrl+5 |
| 6 | extension.surrounding.command06 | ctrl+q ctrl+6 |
| 7 | extension.surrounding.command07 | ctrl+q ctrl+7 |
| 8 | extension.surrounding.command08 | ctrl+q ctrl+8 |
| 9 | extension.surrounding.command09 | ctrl+q ctrl+9 |
| 10 | extension.surrounding.command10 | ctrl+q ctrl+F10 |
| 11 | extension.surrounding.command11 | ctrl+q ctrl+F1 |
| 12 | extension.surrounding.command12 | ctrl+q ctrl+F2 |
| 13 | extension.surrounding.command13 | ctrl+q ctrl+F3 |
| 14 | extension.surrounding.command14 | ctrl+q ctrl+F4 |
| 15 | extension.surrounding.command15 | ctrl+q ctrl+F5 |
| 16 | extension.surrounding.command16 | ctrl+q ctrl+F6 |
| 17 | extension.surrounding.command17 | ctrl+q ctrl+F7 |
| 18 | extension.surrounding.command18 | ctrl+q ctrl+F8 |
| 19 | extension.surrounding.command19 | ctrl+q ctrl+F9 |

To configure your own keyboard shortcuts,  Add follows to your *keybindings.json* file.

```
    {
        "key": "ctrl+k ctrl+e",
        "command": "extension.surrounding.command00",
        "when": "editorHasSelection && editorTextFocus"
    },
    {
        "key": "ctrl+k ctrl+s",
        "command": "extension.surrounding.command01",
        "when": "editorHasSelection && editorTextFocus"
    },
    // ...
```

# Reposicotry

[https://github.com/sifue/vsc-surrounding](https://github.com/sifue/vsc-surrounding)