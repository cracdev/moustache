import {join} from 'path'

const include = join(__dirname, 'app')

export default {
	  entry: './app/js',
	  output: {
			    path: join(__dirname, 'dist'),
			    libraryTarget: 'umd',
			    library: 'transformers',
			  },
	  devtool: 'source-map',
	  module: {
			    loaders: [
						      {test: /\.js$/, loader: 'babel', include},
						      {test: /\.json$/, 'loader': 'json', include},
						    ]
			  }
}
