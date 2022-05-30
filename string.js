var s = "a";
var a = []; // a[i].length == 2**i
for (var i = 0; i < 100; ++i) {
    console.log(s.length);
    a.push(s);
    try {
        s = s + s;
    } catch (e) {
        console.log(e);
        break;
    }
}
function search(s, i) {
    if (i < 0) {
        return s.length;
    }
    let s1;
    try {
        s1 = s + a[i];
    } catch (e) {
        return search(s, i - 1);
    }
    return search(s1, i - 1);
}
var result = search(s, a.length - 1);
console.log(`${result} (0x${result.toString(16)})`);
