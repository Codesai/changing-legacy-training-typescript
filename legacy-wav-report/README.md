## Kata Objective

To practice how to add a feature to legacy code.

## An ultra urgent feature arrives

The `WavExtractor32v` class needs to be updated to exclude files containing a keyword.

- Main receives multiples args
- First argument is the directory where the wav files are located.
- The other arguments are optional parameters, and they use the following pattern "name=value"
- Exclude filenames with a keyword is an optional parameter with name "exclude" (example: "exclude=keyword").

## Constraints

- You cannot modify caller code.
- You don’t have time to test/refactor `WavExtractor32v` or `Main`.

We may need to use test doubles.
Here you can find some example code that may help
you: https://gist.github.com/trikitrok/c35768c3f67e10f4f0c6ecb0320e64d7
