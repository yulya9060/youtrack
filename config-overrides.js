const rewired = require('react-app-rewired');

function rewireSass(config) {
    const cssLoader = rewired.getLoader(
        config.module.rules,
        rule => rule.test && String(rule.test) === String(/\.css$/)
    );

    const sassLoader = {
        test: /\.scss$/,
        use: [...(cssLoader.loader || cssLoader.use), 'sass-loader']
    };

    const svgInlineLoader = {
        test: /\.svg$/,
        exclude: [/styles\/icons\/background-svgs/],
        loader: 'svg-inline-loader',
    };

    const oneOf = config.module.rules.find(rule => rule.oneOf).oneOf;
    oneOf.unshift(sassLoader);
    oneOf.unshift(svgInlineLoader);

    return config;
}

module.exports = {
    webpack: function(config, env) {
        config = rewireSass(config, env);
        return config;
    }
};