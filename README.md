A little script to remove `undefined`, `null` or empty values in a json file to avoid Transifex errors


# Installation

```bash
npm install -g transifexify
```

# How To

It takes json files as input with names like `fr.json`
and creates a `fr.transifex.json` file that shouldn't throw errors when parsed by Transifex

```bash
transifexify path/to/lang/files/de.json
# => path/to/lang/files/de.transifex.json
```
