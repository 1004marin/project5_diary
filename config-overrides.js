module.exports = function override(config, env) {
    // Webpack 설정 수정
    config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
    };
    return config;
};
