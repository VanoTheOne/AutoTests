module.exports = {
    bail: 0,
    color: true,
    delay: false,
    diff: true,
    exit: false, // could be expressed as "'no-exit': true"
    extension: ['js', 'cjs', 'mjs'],
    parallel: false,
    recursive: false,
    reporter: "mochawesome",
    require: "mochawesome/register",
    retries: 0,
    slow: '75',
    sort: false,
    spec: ['test/**/*.spec.js'], // the positional arguments!
    timeout: '5000',
    ui: 'bdd',
};