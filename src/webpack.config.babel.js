const plugins = [
    new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom',
        $: 'jquery',
        jQuery: 'jquery'
    })
]
module.exports = () => ({
    plugins: plugins
});
