# set-dnn-manifest-versions
Sets Dnn manifest package versions to a given version string

## Inputs

| Input   | Required | Default  | Notes |
|---------|----------|----------|-------|
| version | Yes      |          |       |
| glob    | No       | **/*.dnn | See [Patterns](https://github.com/actions/toolkit/blob/master/packages/glob/README.md#patterns) for valid usage |

## Usage example
When providing only a version, the action will update all the .dnn manifest files in the root or any subfolder.
```yaml
name: Set manifest versions
on: [push] # You can act on other events depending on your needs

jobs:
  setManifestVersions:
    name: Set Manifest Versions
    runs-on: ubuntu-latest # The action is javascript based so can be used in any environment that has node.js
    
    steps:
      - uses: valadas/set-dnn-manifest-versions@v1
        with:
          version: 01.02.03 # Must be a nn.nn.nn formatted string, can be takin from other actions outputs such as https://github.com/valadas/get-release-branch-version or https://github.com/valadas/dnn-platform-get-version
```

## Example with glob (optional)
You can alternatively provide your own globbing patter for files to include or exclude.

```yaml
...

- uses: valadas/set-dnn-manifest-versions@v1
  with:
    version: 02.03.04
    glob: './my-mono-repo/modules/**/*.dnn  !somemodule/*.dnn' # Will include all .dnn files under the my-mono-repo/modules folder except if it is in a somemodule folder. See https://github.com/actions/toolkit/blob/master/packages/glob/README.md#patterns for details on supported values.
```