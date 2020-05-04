module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/codenames' : '/',
	productionSourceMap: false,
	// whitespace: 'condense',
	devServer: {
		open: true,
		port: 8081,
	},
}
