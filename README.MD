# 实现一个mini-complier,类似于mini-babel

# 实现一个编译器的思路
 1. 词法分析： 输入字符 ->tokenizer 挨个字符遍历进行词法分析生成tokens 
    ```
     const input = '(add 2 (subtract 4 2))'
     const tokens = [
         { type: 'paren', value: '(' },
        { type: 'name', value: 'add' },
        { type: 'number', value: '2' },
        { type: 'paren', value: '(' },
        { type: 'name', value: 'subtract' },
        { type: 'number', value: '4' },
        { type: 'number', value: '2' },
        { type: 'paren', value: ')' },
        { type: 'paren', value: ')' }
     ]
    ```
  2. 语法分析 tokens -> ast 遍历生成的tokens的每一个字符进行语法分析生成新的抽象语法树ast
    ```
     const ast = {
         type: 'Program',
         body: [{
            type: 'CallExpression',
            name: 'add',
            params:
                [{
                type: 'NumberLiteral',
                value: '2',
                },
                {
                type: 'CallExpression',
                name: 'subtract',
                params: [{
                    type: 'NumberLiteral',
                    value: '4',
                }, ∏
                    type: 'NumberLiteral',
                    value: '2',
                }]
                }]
            }]
     }

    ```
  3. 转换ast,对于生成的ast,通过转换器+遍历器（深度优先遍历算法）进一步生成需要的新ast

   ```
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
   ```

   4. 代码生成阶段，本质上还是遍历新的ast进行字符串拼接

   ```
    const output =  'add(2, subtract(4, 2));'
   ```


# 后续补上代码测试用例