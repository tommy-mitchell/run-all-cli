/* eslint-disable ava/no-ignored-test-files, unicorn/no-top-level-side-effects -- intentional */
import { fileURLToPath } from "node:url";
import anyTest, { type TestFn } from "ava";
import {
	$$,
	type ConcurrencyContext,
	type ExecaError,
	getExecutableBinPath,
	withConcurrency,
} from "@tommy-mitchell/test-helpers";

export const test = anyTest as TestFn<{
	binPath: string;
	concurrency: ConcurrencyContext;
}>;

test.before("setup context", async t => {
	t.context.binPath = await getExecutableBinPath({
		map: binPath => binPath.replace("dist", "src").replace(".js", ".ts"),
	});

	t.context.concurrency = await withConcurrency();
	t.log("CLI concurrency:", t.context.concurrency.max);
});

test.beforeEach("setup concurrency", async t => {
	await t.context.concurrency.lock();
});

test.afterEach.always(t => {
	t.context.concurrency.unlock();
});

export const RUN_FIXTURE = fileURLToPath(new URL("fixture.js", import.meta.url));

type VerifyCliMacroArgs = [{
	commands: string[];
	exitCode?: number;
	expected: string;
}];

export const verifyCli = test.macro<VerifyCliMacroArgs>(async (t, { commands, exitCode: expectedCode, expected }) => {
	const resultOrError = await $$(t.context.binPath, commands);

	if (resultOrError.failed && resultOrError.exitCode === undefined) {
		// eslint-disable-next-line @typescript-eslint/only-throw-error -- types are wrong, class is an actual Error instance
		throw resultOrError as ExecaError;
	}

	const { all: output, exitCode } = resultOrError;

	t.is(output, expected);

	if (expectedCode !== undefined) {
		t.is(exitCode, expectedCode, "Process exited with incorrect exit code!"); // eslint-disable-line ava/no-conditional-assertion
	}
});
