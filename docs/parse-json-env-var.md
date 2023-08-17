
# Parse JSON Environment Variable action

Parse the input as JSON and set the resulting object as environment variables.

## Action

```
oneblink/github-actions/parse-json-env-var
```

## Inputs

### `variable`

**Required** The stringified JSON to parse.

### `prefix`

A prefix that can be added to the key of each environment variable.

### `is-secret`

Set to true to have the environment variables be treated as secrets and hidden from output logs.

## Example usage

```yaml
name: Variables
on: [push]
jobs:
  variables:
    name: Variables
    runs-on: ubuntu-latest
    steps:
      - uses: oneblink/github-actions/parse-json-env-var@master
        with:
          variable: ${{ vars.MY_GITHUB_VARIABLE }}
          is-secret: false
      - uses: oneblink/github-actions/parse-json-env-var@master
        with:
          prefix: "VARIABLES_"
          variable: ${{ vars.MY_GITHUB_VARIABLE }}
          is-secret: false
      - uses: oneblink/github-actions/parse-json-env-var@master
        with:
          variable: ${{ secrets.MY_GITHUB_SECRET }}
          is-secret: true
      - uses: oneblink/github-actions/parse-json-env-var@master
        with:
          prefix: "SECRETS_"
          variable: ${{ secrets.MY_GITHUB_SECRET }}
          is-secret: true
      - run: printenv
```