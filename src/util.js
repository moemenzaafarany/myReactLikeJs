export function dedent(callSite, ...args) {
  function format(str) {
    let size = -1;

    return str.replace(/\n(\s+)/g, (m, m1) => {
      if (size < 0) size = m1.replace(/\t/g, "    ").length;
      return "\n" + m1.slice(Math.min(m1.length, size));
    });
  }
  if (typeof callSite === "string") return format(callSite);
  if (typeof callSite === "function")
    return (...args) => format(callSite(...args));
  let output = callSite
    .slice(0, args.length + 1)
    .map((text, i) => (i === 0 ? "" : args[i - 1]) + text)
    .join("");

  return format(output);
}
export const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);

export const directives = {
  map: curry((cb, arr = []) => {
    if (!Array.isArray(arr)) {
      return "";
    }
    return arr.map(cb).join("");
  }, 2),
  jsonData: (d) => `'${JSON.stringify(d)}'`
};
