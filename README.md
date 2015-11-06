A little script to remove `undefined`, `null` or empty values in a json file to avoid Transifex errors

When submitting a json file to Transifex, if it has `null`, `undefined` or `''` values, like [this one](https://github.com/inventaire/inventaire-client/blob/i18n/src/shortkey/fr.json), Transifex will reject your file. This module just generates a file without the key/value pairs with those values

# Installation

```bash
npm install -g transifexify
```

# How To

It takes json files as input with names like `fr.json`
and creates a `fr.transifex.json` file that shouldn't throw errors when parsed by Transifex

* you can pass either one file
```bash
transifexify path/to/lang/files/de.json
# => path/to/lang/files/de.transifex.json
```

* or several
```bash
transifexify path/to/lang/files/*.json
# => path/to/lang/files/de.transifex.json, path/to/lang/files/fr.transifex.json etc
```
