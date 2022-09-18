import { defineComponent as s, ref as c, openBlock as l, createElementBlock as i, Fragment as u, createElementVNode as e, toDisplayString as n, createTextVNode as a } from "vue";
const m = /* @__PURE__ */ a(" hogehoge "), g = { class: "card" }, p = /* @__PURE__ */ s({
  __name: "Hoge",
  props: {
    msg: String
  },
  setup(r) {
    const t = c(0);
    return (_, o) => (l(), i(u, null, [
      m,
      e("h1", null, n(r.msg), 1),
      e("div", g, [
        e("button", {
          type: "button",
          onClick: o[0] || (o[0] = (d) => t.value++)
        }, "count is " + n(t.value), 1)
      ])
    ], 64));
  }
}), h = p;
export {
  h as MyHoge
};
