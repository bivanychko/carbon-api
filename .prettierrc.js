module.exports = {
    "singleQuote": false,
    "trailingComma": "all",
    "arrowParens": "avoid",
    "printWidth": 130,
    "importOrder": [
        "<THIRD_PARTY_MODULES>",
        "^[./]"
    ],
    "importOrderSeparation": true,
    "importOrderSortSpecifiers": true,
    "importOrderParserPlugins": ["typescript", "decorators-legacy"],
    "plugins": ["@trivago/prettier-plugin-sort-imports"]
}
