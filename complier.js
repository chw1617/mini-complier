import tokenizer  from "./parse/tokenizer.js";
import parser from "./parse/parser.js";
import transformer from "./transformer.js";
import codeGenerator from "./generator.js";
function compiler(input) {
    let tokens = tokenizer(input); // 词法分析生成tokens
    let ast    = parser(tokens); // 语法分析生成ast
    let newAst = transformer(ast); // 语法转换生成newast
    let output = codeGenerator(newAst); // 代码生成
    return output;
}

const input = '(add 2 (subtract 4 2))'
const output = 'add(2, subtract(4, 2));'
console.log(compiler(input))
export default compiler