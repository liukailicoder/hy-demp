// vue cli 配置
// postcss.config.js

export default {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,
      selectorBlackList: ["favor"]
    }
  }
}

// module.exports = {
//   plugins: {
//     'postcss-px-to-viewport': {
//       viewportWidth: 375,
//     },
//   },
// };
