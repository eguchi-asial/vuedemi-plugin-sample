import { defineComponent as l, ref as p, openBlock as i, createElementBlock as m, Fragment as u, createElementVNode as c, toDisplayString as r, createTextVNode as g } from "vue";
const f = /* @__PURE__ */ g(" hogehoge "), d = { class: "card" }, a = /* @__PURE__ */ l({
  __name: "Hoge",
  props: {
    msg: String
  },
  setup(o) {
    const e = p(0);
    return (n, t) => (i(), m(u, null, [
      f,
      c("h1", null, r(o.msg), 1),
      c("div", d, [
        c("button", {
          type: "button",
          onClick: t[0] || (t[0] = (s) => e.value++)
        }, "count is " + r(e.value), 1)
      ])
    ], 64));
  }
}), y = a, _ = { Hoge: a }, h = (o) => {
  let e = "", n = !1;
  for (const t of o) {
    const s = t.toUpperCase() === t;
    s && n && (e += "-"), e += t, n = !s;
  }
  return e.replace(/-+/g, "-").toLowerCase();
}, C = {
  install(o) {
    Object.entries(_).forEach(([e, n]) => {
      const t = h(e);
      o.component(`my-${t}`, n);
    });
  }
};
export {
  y as MyHoge,
  C as default
};
