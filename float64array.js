var n = 1;
var a = []; // a[i] == 2**i
for (var i = 0; i < 100; ++i) {
    console.log(n);
    a.push(n);
    try {
        new Float64Array(n + n);
        n += n;
    } catch (e) {
        console.log(e);
        break;
    }
}
function search(n, i) {
    if (i < 0){
        return n;
    }
    let m;
    try {
        new Float64Array(n + a[i]);
        m = n + a[i];
    } catch (e) {
        return search(n, i - 1);
    }
    return search(m, i - 1);
}
var result = search(n, a.length - 1);
console.log(`${result} (0x${result.toString(16)})`);
