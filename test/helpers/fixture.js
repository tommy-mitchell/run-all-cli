#!/usr/bin/env node
import process from "node:process";

const [arg] = process.argv.slice(2);

if (arg === "--pass") {
	console.log("pass");
	process.exit(0);
} else if (arg === "--fail") {
	console.log("fail");
	process.exit(1);
}

console.log("foo\nbar\nbaz");
