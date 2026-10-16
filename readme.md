# run-all-cli

Run multiple commands sequentially, failing if any command fails.

Like a cross-platform `;` that preserves failures.

## Install

```sh
npm install --save-dev run-all-cli
```

<details>
<summary>Other package managers</summary>
<p>

```sh
yarn add --dev run-all-cli
```

```sh
pnpm add --save-dev run-all-cli
```

</p>
</details>

## Usage

```txt
$ run-all --help

  Usage
    $ run-all <command> <command> [commands…]

  Examples
    $ run-all fail pass
    Running command that fails…
    Running command that passes…

    $ run-all "dprint check" xo
```

## Related

- [npm-run-all2](https://github.com/bcomnes/npm-run-all2) - A CLI tool to run multiple npm-scripts in parallel or sequential. (Maintenance fork)
- [e18e](https://e18e.dev/docs/replacements/npm-run-all) - List of replacements for `npm-run-all`.
