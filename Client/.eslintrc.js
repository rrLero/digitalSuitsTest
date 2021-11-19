const OFF = 0;
// const WARNING = 1;
const ERROR = 2;

module.exports = {
    env: {
        'browser': true,
        'es6': true,
        'jest': true,
        'node': true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    globals: {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    rules: {
        'linebreak-style': OFF,
        'space-before-blocks': ERROR,
        'keyword-spacing': ERROR,
        'accessor-pairs': OFF,
        'array-callback-return': ERROR,
        'brace-style': [ERROR, '1tbs'],
        'camelcase': OFF,
        'comma-dangle': [ERROR, 'always-multiline'],
        'consistent-return': ERROR,
        'dot-location': [ERROR, 'property'],
        'dot-notation': ERROR,
        'eol-last': ERROR,
        'eqeqeq': [ERROR, 'allow-null'],
        'indent': [ERROR, 4, {SwitchCase: 1}],
        'jsx-quotes': [ERROR, 'prefer-double'],
        'quotes': ['error', 'single'],
        'semi': 2,
        'max-len': [
            ERROR, {
                code: 120,
                ignorePattern: '^import ',
            },
        ],
        'space-in-parens': ERROR,
        'object-curly-spacing': [ERROR, 'always'],
        'react/prop-types': OFF,
        '@typescript-eslint/explicit-function-return-type': OFF,
        '@typescript-eslint/no-use-before-define': OFF,
        '@typescript-eslint/no-unused-vars': OFF,
        '@typescript-eslint/explicit-module-boundary-types': OFF,
        '@typescript-eslint/ban-types': [
            ERROR,
            {
                types: {
                    '{}': false,
                },
            },
        ],
    },
    'overrides': [
        {
            'files': ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
            'extends': ['plugin:testing-library/react'],
        },
        {
            'files': ['*.test.ts','*.test.tsx', 'src/*.d.ts'],
            'rules': {
                '@typescript-eslint/no-explicit-any': OFF,
                'testing-library/no-node-access': OFF,
                'jest-dom/prefer-in-document': OFF,
                'testing-library/prefer-screen-queries': OFF,
            },
        },
        {
            files: ['webpack.config.js'],
            rules: {
                '@typescript-eslint/no-var-requires': OFF,
            },
        },
    ],
};
