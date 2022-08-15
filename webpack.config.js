const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

// Typescript(타입스크립트)를 빌드할 때 성능을 향상시키기 위한 플러그인를 불러오기
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  entry: {
    // 번들 파일(bundle)의 시작 파일(Entry)을 jsx에서 tsx로 변경
    "js/app": ["./src/lib/index.tsx"],
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/",
  },
  module: {
    rules: [
      // Webpack(웹팩)에서 Typescript(타입스크립트)를 사용하기 위해 js|jsx를 ts|tsx로 수정 후 ts-loader를 추가
      // ts-loader의 옵션은 성능 향상을 위해서
      {
        test: /\.(ts|tsx)$/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    {  
      test: /\.(scss|css)$/,
      include: path.resolve(__dirname, "./src/lib/carousel/slide.scss"),
      use: [
        { loader: "style-loader" },
        {
          loader: "css-loader",
          options: {
            modules: true,
          },
        },
        { loader: "sass-loader" },
      ],
    },
    {
      test: /\.(png|jpg|gif|svg)$/, // 확장자가 png, jpg, gif, svg인것에 대해서만 등록
      loader: 'file-loader',
    }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    // Typescript(타입스크립트)의 컴파일 속도 향상을 위한 플러그인을 설정
    new ForkTsCheckerWebpackPlugin(),
  ],
};
