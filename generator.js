// 代码生成阶段，其实就是字符串拼接
function codeGenerator(node){
    switch(node.type){
        // 根节点，递归 body 节点列表
        case 'Program':
            return node.body.map(codeGenerator).join('\n');
        // 表达式，处理表达式
        case "ExpressionStatement":
            return `${codeGenerator(node.expression)};`
        // 函数调用
        case "CallExpression":
            return `${codeGenerator(node.callee)}(${node.arguments.map(codeGenerator).join(', ')})`;
         // 标识符，数值，直接输出
        case 'Identifier':
           return node.name;
        case 'NumberLiteral':
            return node.value;
        default:
        throw new TypeError(node.type);
    }
}

const newast = {
        type: 'Program',
        body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: 'add'
            },
            arguments: [
                {
                type: 'NumberLiteral',
                value: '2'
                }, 
                {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'subtract'
                    },
                    arguments: [{
                        type: 'NumberLiteral',
                        value: '4'
                    }, {
                        type: 'NumberLiteral',
                        value: '2'
                    }]
                }
              ]  
           }
        }]
}
const res ='add(2, subtract(4, 2));'
console.log(codeGenerator(newast))

export default codeGenerator