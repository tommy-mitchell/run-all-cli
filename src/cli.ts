#!/usr/bin/env node
/* eslint-disable no-await-in-loop -- commands are executed sequentially */
import process from "node:process";
import { tokenizeArgs } from "args-tokenizer";
import { x } from "tinyexec";
import packageJson from "../package.json" with { type: "json" };

const argv = process.argv.slice(2);

if (argv.includes("--version") || argv.includes("-v")) {
	console.log(packageJson.version);
	process.exit(0);
}

if (argv.length === 0 || argv.includes("--help") || argv.includes("-h")) {
	const help = `
  Usage
    $ run-all <command> <command> [commands…]

  Examples
    $ run-all fail pass
    Running command that fails…
    Running command that passes…

    $ run-all "dprint check" xo
`;

	console.log(help.trimEnd());
	process.exit(0);
}

let didAnyFail = false;

for (const input of argv) {
	const [command, ...args] = tokenizeArgs(input);
	const result = await x(command!, args, { nodeOptions: { stdio: "inherit" } });
	didAnyFail ||= result.exitCode !== 0;
}

if (didAnyFail) {
	process.exit(1);
}
