module.exports = {
    // 环境定义了预定义的全局变量。
    "env": {
        // 环境定义了预定义的全局变量。更多在官网查看
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    // 启用推荐的规则
    "extends": "eslint:recommended",
    // JavaScript 语言选项
    "parserOptions": {
        "ecmaFeatures": {
            // 启用JSX
            "jsx": true
        },
        "ecmaVersion": 2016,
        "sourceType": "module"
    },

    /**
     * "off" 或 0 - 关闭规则
     * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
     * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
     */
    "rules": {
   	    "no-console":0 // 开启 console语句
    }
};