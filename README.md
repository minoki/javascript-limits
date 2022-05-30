# Limits of JavaScript

Environment: AArch64 macOS

Node.js v17.7.2 / Firefox Nightly 102.0a1 (2022-05-29) / macOS 12.3.1

## String

The spec says:

> The String type is the set of all ordered sequences of zero or more 16-bit unsigned integer values (“elements”) up to a maximum length of 2^53 - 1 elements.
>
> https://262.ecma-international.org/12.0/#sec-ecmascript-language-types-string-type

Test program: [string.js](string.js)

| V8 (Node.js) | SpiderMonkey (Firefox) | JavaScriptCore (osascript) |
|-|-|-|
| 536870888 (0x1fffffe8) | 1073741822 (0x3ffffffe) | 2147483647 (0x7fffffff) |

## TypedArray

Test program: [uint8array.js](uint8array.js) / [float64array.js](float64array.js)

| | V8 (Node.js) | SpiderMonkey (Firefox) | JavaScriptCore (osascript) |
|-|-|-|-|
| `Uint8Array` | 4294967296 (0x100000000) | 8589934592 (0x200000000) | 4294967296 (0x100000000) |
| `Float64Array` | 4294967296 (0x100000000) | 1073741824 (0x40000000) | 536870912 (0x20000000) |

## Array

The spec says:

> Array(...values)
>
> Let intLen be !ToUint32(len).
> If intLen is not the same value as len, throw a RangeError exception.
>
> https://262.ecma-international.org/12.0/#sec-array

> 23.1.2.1 Array.from(items [, mapfn [, thisArg]])
>
> i. If k ≥ 2^53-1, then
>     1. Let error be ...
>
> https://262.ecma-international.org/12.0/#sec-array.from

Test program for Node.js: [array-node.lua](array-node.lua)

Test program for osascript (JavaScriptCore): [array-osascript.lua](array-osascript.lua)

Example (n=3): `new Array(3).fill(0)`

| V8 (Node.js) | JavaScriptCore (osascript) |
|-|-|
| 100663296 (0x6000000) | greater than 268435456 |

## Parser

### Braces `{}`

Test program: [depth-braces.js](depth-braces.js)

Example (n=3): `{{{}}}`

| V8 (Node.js) | SpiderMonkey (Firefox) | JavaScriptCore (osascript) |
|-|-|-|
| 2884 (0xb44) | 855 (0x357) | 6587 (0x19bb) |

### Parentheses `()`

Test program: [depth-parens.js](depth-parens.js)

Example (n=3): `(((0)))`

| V8 (Node.js) | SpiderMonkey (Firefox) | JavaScriptCore (osascript) |
|-|-|-|
| 1657 (0x679) | 1412 (0x584) | 2932 (0xb74) |

### `let`-declared variables

Test program: [let.js](let.js)

Example (n=3): `let a0; let a1; let a2;`

| V8 (Node.js) | SpiderMonkey (Firefox) | JavaScriptCore (osascript) |
|-|-|-|
| 8388607 (0x7fffff) | greater than 16777216 | 638656 (0x9bec0) |

### function parameters

Test program: [parameter.js](parameter.js)

Example (n=3): `function f(a0,a1,a2){}`

| V8 (Node.js) | SpiderMonkey (Firefox) | JavaScriptCore (osascript) |
|-|-|-|
| 65534 (0xfffe) | 65535 (0xffff) | greater than 16777216 |

### function call

Test program: [call.js](call.js)

Example (n=3): `Array.of(0,0,0);`

| V8 (Node.js) | SpiderMonkey (Firefox) | JavaScriptCore (osascript) |
|-|-|-|
| 54928 (0xd690) | 65535 (0xffff)  | 638624 (0x9bea0) |

### Array literal

Test program: [array-literal.js](array-literal.js)

Example (n=3): `void[0,0,0];`

| V8 (Node.js) | SpiderMonkey (Firefox) | JavaScriptCore (osascript) |
|-|-|-|
| greater than 67108864 | 268435453 (0xffffffd) | 178956970 (0xaaaaaaa) |
