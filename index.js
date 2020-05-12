#!/usr/bin/env node

const spawn = require("cross-spawn");
const { exec } = require("child_process");
const exit = require("exit");

function normalize(args) {
    return args.map(arg => {
        Object.keys(process.env)
            .sort((x, y) => x.length < y.length) // sort by descending length to prevent partial replacement
            .forEach(key => {
                const regex = new RegExp(`\\$${key}`, "ig");
                const value = (process.env[key] == null) ? '' : process.env[key];
                arg = arg.replace(regex, value);
            });
        return arg;
    })
}

let args = process.argv.slice(2);
if (args.length === 1) {
    const [command] = normalize(args);
    const proc = exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        process.stdout.write(stdout);
        process.stderr.write(stderr);
        exit(proc.code);
    });
} else {
    args = normalize(args);
    const command = args.shift();
    const proc = spawn.sync(command, args, { stdio: "inherit" });
    exit(proc.status);
}