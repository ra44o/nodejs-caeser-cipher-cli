# Caesar cipher CLI

## My implementaion of the [task](https://github.com/rolling-scopes-school/nodejs-course-template/blob/master/TASKS.md#task-1-caesar-cipher-cli-tool).

To run the code open any command line and run one of the examples below.

### Here some options: 
- `-a` or `--action` should equal to `encode` or `decode`, it is a required option;
- `-s` or `--shift` should be not negative integer, it is a required option;
- `-i` or `--input` should be a string, it is a relative or an absolete path to the input file. If the file is not found, the message will be shown. If the option will not be provided, you will be offered to enter some text in a command line.
- `-o` or `--output` should be a string, it is a relative or an absolete path to the output file. If the file is not found, the message will be shown. If the option will not be provided, the output will be performed to the command line.

### Examples:

```bash
node cli.js -s 7 -o output.txt --action encode -i input.txt
```
or 
```bash
node cli.js --shift 7 --output "./output.txt" --action encode --input "./input.txt"
```
