import * as configs from "@tommy-mitchell/configs/xo";

/** @type {import('xo').FlatXoConfig} */
export default [...configs.xo, ...configs.dprint, { ignores: ["test/fixtures"] }, {
	rules: {
		"unicorn/no-process-exit": "off",
	},
}];
