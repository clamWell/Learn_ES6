const path = require('path');

module.exports = {
  // enntry file
  entry: './src/index.js',
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/js'),
	publicPath: '/dist/js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,  // 'js 파일로 끝나는 것은'을 의미하는 정규표현식
        include: [
          path.resolve(__dirname, 'src/js') //이 경로 아래에 있는 것들 포함
        ],
        exclude: /node_modules/, //이 아래 경로에 있는 것은 불포함
        use: { 
          loader: 'babel-loader', //바벨 로더를 이용해 webpack 실행에 앞서 스크립트들을 트랜스파일링 해준다.
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  // https://webpack.js.org/concepts/mode/#mode-development
  mode: 'development'
};