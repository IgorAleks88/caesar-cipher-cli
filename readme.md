1. Pull branch develop
2. Go to caesar-cipher-cli directory
3. Launch npm -i command
4. Launch app with command node index.js
5. Mandatory options:
    -a or --action: may be "encode" or "decode" only
    -s or --shift: may be only integer type
6. Non-mandatory options:
    -i or --input: string with path to input file. If skipped, stdin process is used
    -o or --output: string with path to output file. If skipped, stdout process is used