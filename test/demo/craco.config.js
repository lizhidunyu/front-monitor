const path = require("path");

module.exports = {
  webpack: {
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/, // 匹配 .ts 和 .tsx 文件
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
  },
};
