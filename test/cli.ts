import process from "node:process";
import { $$, dedent } from "@tommy-mitchell/test-helpers";
import { RUN_FIXTURE, test, verifyCli } from "./helpers/cli.ts";

test("shows help if no input", async t => {
	const { all: helpText } = await $$`${t.context.binPath}`;
	t.snapshot(helpText);
});

for (const flag of ["--help", "-h"]) {
	test(`shows help (${flag})`, async t => {
		const { all: helpText } = await $$`${t.context.binPath} ${flag}`;
		t.snapshot(helpText);
	});
}

for (const flag of ["--version", "-v"]) {
	test(`shows version (${flag})`, async t => {
		const { all: versionText } = await $$`${t.context.binPath} ${flag}`;
		t.is(versionText, process.env["npm_package_version"]!);
	});
}

test("passes command output through", verifyCli, {
	commands: [RUN_FIXTURE],
	expected: dedent`
		foo
		bar
		baz
	`,
});

test("accepts multiple commands", verifyCli, {
	commands: [RUN_FIXTURE, RUN_FIXTURE, RUN_FIXTURE, RUN_FIXTURE],
	expected: dedent`
		foo
		bar
		baz
		foo
		bar
		baz
		foo
		bar
		baz
		foo
		bar
		baz
	`,
});

test("fails if any command fails", verifyCli, {
	commands: [`${RUN_FIXTURE} --pass`, `${RUN_FIXTURE} --fail`, `${RUN_FIXTURE} --pass`],
	exitCode: 1,
	expected: dedent`
		pass
		fail
		pass
	`,
});
