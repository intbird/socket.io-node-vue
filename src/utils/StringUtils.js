export default function startWith(source, str) {
  const reg = new RegExp("^" + str);
  return reg.test(source);
}
