import {test,expect,describe,it} from 'vitest'
import tokenizer from './tokenizer'

test('词法分析测试', () => { 
    const code = '(add 2 (subtract 4 2))'
    const token = [                                        
    { type: 'paren', value: '(' },       
    { type: 'name', value: 'add' },      
    { type: 'number', value: '2' },      
    { type: 'paren', value: '(' },       
    { type: 'name', value: 'subtract' }, 
    { type: 'number', value: '4' },      
    { type: 'number', value: '2' },      
    { type: 'paren', value: ')' },       
    { type: 'paren', value: ')' },       
   ]
   expect(tokenizer(code)).toEqual(token)
 })

 
 