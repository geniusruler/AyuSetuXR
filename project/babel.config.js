module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      '@babel/plugin-proposal-export-namespace-from',
      ['react-native-reanimated/plugin', {}, 'reanimated-plugin'],
      ['react-native-worklets/plugin', {}, 'worklets-plugin'],
    ],
    assumptions: {
      arrayLikeIsIterable: true,
    },
  };
};