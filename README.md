# set-dnn-manifest-versions
Sets Dnn manifest package versions to a given version string

## Inputs

| Input                 | Required | Default  | Notes |
|-----------------------|----------|----------|-------|
| version               | Yes      |          |       |
| glob                  | No       | **/*.dnn | See [Patterns](https://github.com/actions/toolkit/blob/master/packages/glob/README.md#patterns) for valid usage |
| skipFile              | No       | null     | glob input is ignored when this option is used.    |
| includeSolutionInfo   | No       | false    | When true, also sets the versions in any found SolutionInfo.cs file. |
| includeIssueTemplates | No       | false    | Specially for the Dnn.Platform repository to update issue templates after creating an RC.
| includePackageJson    | No       | false    | If true, will update all versions of packa
| includeDnnReactCommon | No       | false    | This option is specially meant for the Dnn.Platform repository. If true, will update all references to the react common bundle too.

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
    # Will include all .dnn files under the my-mono-repo/modules folder except if it is in a somemodule folder. See https://github.com/actions/toolkit/blob/master/packages/glob/README.md#patterns for details on supported values.
    glob: |-
      ./my-mono-repo/modules/**/*.dnn
      \!somemodule/*.dnn
```

## Example with skipFile (optional)
The skipfile is a text file with one glob per line for the manifest files to ignore. All other .dnn manifests not listed in the skipFile will be modified. When skipFile input is used, the glob input is ignored.

```yaml
...

- uses: valadas/set-dnn-manifest-versions@v1
  with:
    version: 04.05.06
    skipFile: './build/unversionedManifests.txt' # Will version all manifests except the ones listed in the glob patterns in the lines of the provided text file.
```