module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential", "@vue/prettier"],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        indent: 2,
        "vue/html-closing-bracket-newline": [
            "error",
            {
                singleline: "never",
                multiline: "always"
            }
        ]
    },
    parserOptions: {
        parser: "babel-eslint"
    },
    globals: {
        current_user: "readonly"
    }
};

/*
    Rules:
      "function-paren-newline": ["error", "never"]
 */
