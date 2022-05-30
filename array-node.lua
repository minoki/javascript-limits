function test(n)
  local s = string.format("node -e 'new Array(%d).fill(0)'", n)
  return os.execute(s)
end
local n, j = 1, 0
for i = 0, 100 do
  print(n)
  if test(n + n) then
    n = n + n
    j = i
  else
    break
  end
end
function search(n, i)
  if i < 0 then
    return n
  end
  local m = n + 2^i
  if test(m) then
    return search(m, i - 1)
  else
    return search(n, i - 1)
  end
end
local result = search(n, j)
io.write(string.format("%d (0x%x)\n", result, result))
