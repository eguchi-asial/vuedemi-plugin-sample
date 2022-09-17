function Lt(e, t) {
  const n = /* @__PURE__ */ Object.create(null), r = e.split(",");
  for (let s = 0; s < r.length; s++)
    n[r[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
function ve(e) {
  if (h(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], s = D(r) ? Yt(r) : ve(r);
      if (s)
        for (const o in s)
          t[o] = s[o];
    }
    return t;
  } else {
    if (D(e))
      return e;
    if (w(e))
      return e;
  }
}
const qt = /;(?![^(]*\))/g, Gt = /:(.+)/;
function Yt(e) {
  const t = {};
  return e.split(qt).forEach((n) => {
    if (n) {
      const r = n.split(Gt);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function Me(e) {
  let t = "";
  if (D(e))
    t = e;
  else if (h(e))
    for (let n = 0; n < e.length; n++) {
      const r = Me(e[n]);
      r && (t += r + " ");
    }
  else if (w(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Le = (e) => D(e) ? e : e == null ? "" : h(e) || w(e) && (e.toString === ft || !N(e.toString)) ? JSON.stringify(e, lt, 2) : String(e), lt = (e, t) => t && t.__v_isRef ? lt(e, t.value) : U(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, s]) => (n[`${r} =>`] = s, n), {})
} : at(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : w(t) && !h(t) && !dt(t) ? String(t) : t, y = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, Qt = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], ut = () => {
}, Xt = () => !1, Zt = /^on[^a-z]/, kt = (e) => Zt.test(e), T = Object.assign, en = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, tn = Object.prototype.hasOwnProperty, _ = (e, t) => tn.call(e, t), h = Array.isArray, U = (e) => be(e) === "[object Map]", at = (e) => be(e) === "[object Set]", N = (e) => typeof e == "function", D = (e) => typeof e == "string", Pe = (e) => typeof e == "symbol", w = (e) => e !== null && typeof e == "object", nn = (e) => w(e) && N(e.then) && N(e.catch), ft = Object.prototype.toString, be = (e) => ft.call(e), pt = (e) => be(e).slice(8, -1), dt = (e) => be(e) === "[object Object]", Fe = (e) => D(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, rn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, sn = rn((e) => e.charAt(0).toUpperCase() + e.slice(1)), ne = (e, t) => !Object.is(e, t), on = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
};
let qe;
const cn = () => qe || (qe = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ge(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let ln;
function un(e, t = ln) {
  t && t.active && t.effects.push(e);
}
const re = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, ht = (e) => (e.w & j) > 0, _t = (e) => (e.n & j) > 0, an = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= j;
}, fn = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let r = 0; r < t.length; r++) {
      const s = t[r];
      ht(s) && !_t(s) ? s.delete(e) : t[n++] = s, s.w &= ~j, s.n &= ~j;
    }
    t.length = n;
  }
}, xe = /* @__PURE__ */ new WeakMap();
let k = 0, j = 1;
const ye = 30;
let O;
const B = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), Re = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class pn {
  constructor(t, n = null, r) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, un(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = O, n = A;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = O, O = this, A = !0, j = 1 << ++k, k <= ye ? an(this) : Ye(this), this.fn();
    } finally {
      k <= ye && fn(this), j = 1 << --k, O = this.parent, A = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    O === this ? this.deferStop = !0 : this.active && (Ye(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Ye(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let A = !0;
const gt = [];
function mt() {
  gt.push(A), A = !1;
}
function Et() {
  const e = gt.pop();
  A = e === void 0 ? !0 : e;
}
function I(e, t, n) {
  if (A && O) {
    let r = xe.get(e);
    r || xe.set(e, r = /* @__PURE__ */ new Map());
    let s = r.get(n);
    s || r.set(n, s = re());
    const o = process.env.NODE_ENV !== "production" ? { effect: O, target: e, type: t, key: n } : void 0;
    De(s, o);
  }
}
function De(e, t) {
  let n = !1;
  k <= ye ? _t(e) || (e.n |= j, n = !ht(e)) : n = !e.has(O), n && (e.add(O), O.deps.push(e), process.env.NODE_ENV !== "production" && O.onTrack && O.onTrack(Object.assign({ effect: O }, t)));
}
function z(e, t, n, r, s, o) {
  const i = xe.get(e);
  if (!i)
    return;
  let c = [];
  if (t === "clear")
    c = [...i.values()];
  else if (n === "length" && h(e))
    i.forEach((p, d) => {
      (d === "length" || d >= r) && c.push(p);
    });
  else
    switch (n !== void 0 && c.push(i.get(n)), t) {
      case "add":
        h(e) ? Fe(n) && c.push(i.get("length")) : (c.push(i.get(B)), U(e) && c.push(i.get(Re)));
        break;
      case "delete":
        h(e) || (c.push(i.get(B)), U(e) && c.push(i.get(Re)));
        break;
      case "set":
        U(e) && c.push(i.get(B));
        break;
    }
  const u = process.env.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: r, oldValue: s, oldTarget: o } : void 0;
  if (c.length === 1)
    c[0] && (process.env.NODE_ENV !== "production" ? G(c[0], u) : G(c[0]));
  else {
    const p = [];
    for (const d of c)
      d && p.push(...d);
    process.env.NODE_ENV !== "production" ? G(re(p), u) : G(re(p));
  }
}
function G(e, t) {
  const n = h(e) ? e : [...e];
  for (const r of n)
    r.computed && Qe(r, t);
  for (const r of n)
    r.computed || Qe(r, t);
}
function Qe(e, t) {
  (e !== O || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(T({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const dn = /* @__PURE__ */ Lt("__proto__,__v_isRef,__isVue"), Nt = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Pe)
), hn = /* @__PURE__ */ Ae(), _n = /* @__PURE__ */ Ae(!0), gn = /* @__PURE__ */ Ae(!0, !0), Xe = /* @__PURE__ */ mn();
function mn() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const r = f(this);
      for (let o = 0, i = this.length; o < i; o++)
        I(r, "get", o + "");
      const s = r[t](...n);
      return s === -1 || s === !1 ? r[t](...n.map(f)) : s;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      mt();
      const r = f(this)[t].apply(this, n);
      return Et(), r;
    };
  }), e;
}
function Ae(e = !1, t = !1) {
  return function(r, s, o) {
    if (s === "__v_isReactive")
      return !e;
    if (s === "__v_isReadonly")
      return e;
    if (s === "__v_isShallow")
      return t;
    if (s === "__v_raw" && o === (e ? t ? Vt : St : t ? vn : Ot).get(r))
      return r;
    const i = h(r);
    if (!e && i && _(Xe, s))
      return Reflect.get(Xe, s, o);
    const c = Reflect.get(r, s, o);
    return (Pe(s) ? Nt.has(s) : dn(s)) || (e || I(r, "get", s), t) ? c : S(c) ? i && Fe(s) ? c : c.value : w(c) ? e ? yt(c) : xt(c) : c;
  };
}
const En = /* @__PURE__ */ Nn();
function Nn(e = !1) {
  return function(n, r, s, o) {
    let i = n[r];
    if (H(i) && S(i) && !S(s))
      return !1;
    if (!e && (!_e(s) && !H(s) && (i = f(i), s = f(s)), !h(n) && S(i) && !S(s)))
      return i.value = s, !0;
    const c = h(n) && Fe(r) ? Number(r) < n.length : _(n, r), u = Reflect.set(n, r, s, o);
    return n === f(o) && (c ? ne(s, i) && z(n, "set", r, s, i) : z(n, "add", r, s)), u;
  };
}
function wn(e, t) {
  const n = _(e, t), r = e[t], s = Reflect.deleteProperty(e, t);
  return s && n && z(e, "delete", t, void 0, r), s;
}
function bn(e, t) {
  const n = Reflect.has(e, t);
  return (!Pe(t) || !Nt.has(t)) && I(e, "has", t), n;
}
function On(e) {
  return I(e, "iterate", h(e) ? "length" : B), Reflect.ownKeys(e);
}
const Sn = {
  get: hn,
  set: En,
  deleteProperty: wn,
  has: bn,
  ownKeys: On
}, wt = {
  get: _n,
  set(e, t) {
    return process.env.NODE_ENV !== "production" && Ge(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return process.env.NODE_ENV !== "production" && Ge(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
}, Vn = /* @__PURE__ */ T({}, wt, {
  get: gn
}), je = (e) => e, Oe = (e) => Reflect.getPrototypeOf(e);
function ce(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = f(e), o = f(t);
  n || (t !== o && I(s, "get", t), I(s, "get", o));
  const { has: i } = Oe(s), c = r ? je : n ? Ke : se;
  if (i.call(s, t))
    return c(e.get(t));
  if (i.call(s, o))
    return c(e.get(o));
  e !== s && e.get(t);
}
function le(e, t = !1) {
  const n = this.__v_raw, r = f(n), s = f(e);
  return t || (e !== s && I(r, "has", e), I(r, "has", s)), e === s ? n.has(e) : n.has(e) || n.has(s);
}
function ue(e, t = !1) {
  return e = e.__v_raw, !t && I(f(e), "iterate", B), Reflect.get(e, "size", e);
}
function Ze(e) {
  e = f(e);
  const t = f(this);
  return Oe(t).has.call(t, e) || (t.add(e), z(t, "add", e, e)), this;
}
function ke(e, t) {
  t = f(t);
  const n = f(this), { has: r, get: s } = Oe(n);
  let o = r.call(n, e);
  o ? process.env.NODE_ENV !== "production" && bt(n, r, e) : (e = f(e), o = r.call(n, e));
  const i = s.call(n, e);
  return n.set(e, t), o ? ne(t, i) && z(n, "set", e, t, i) : z(n, "add", e, t), this;
}
function et(e) {
  const t = f(this), { has: n, get: r } = Oe(t);
  let s = n.call(t, e);
  s ? process.env.NODE_ENV !== "production" && bt(t, n, e) : (e = f(e), s = n.call(t, e));
  const o = r ? r.call(t, e) : void 0, i = t.delete(e);
  return s && z(t, "delete", e, void 0, o), i;
}
function tt() {
  const e = f(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? U(e) ? new Map(e) : new Set(e) : void 0, r = e.clear();
  return t && z(e, "clear", void 0, void 0, n), r;
}
function ae(e, t) {
  return function(r, s) {
    const o = this, i = o.__v_raw, c = f(i), u = t ? je : e ? Ke : se;
    return !e && I(c, "iterate", B), i.forEach((p, d) => r.call(s, u(p), u(d), o));
  };
}
function fe(e, t, n) {
  return function(...r) {
    const s = this.__v_raw, o = f(s), i = U(o), c = e === "entries" || e === Symbol.iterator && i, u = e === "keys" && i, p = s[e](...r), d = n ? je : t ? Ke : se;
    return !t && I(o, "iterate", u ? Re : B), {
      next() {
        const { value: l, done: a } = p.next();
        return a ? { value: l, done: a } : {
          value: c ? [d(l[0]), d(l[1])] : d(l),
          done: a
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function M(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${sn(e)} operation ${n}failed: target is readonly.`, f(this));
    }
    return e === "delete" ? !1 : this;
  };
}
function xn() {
  const e = {
    get(o) {
      return ce(this, o);
    },
    get size() {
      return ue(this);
    },
    has: le,
    add: Ze,
    set: ke,
    delete: et,
    clear: tt,
    forEach: ae(!1, !1)
  }, t = {
    get(o) {
      return ce(this, o, !1, !0);
    },
    get size() {
      return ue(this);
    },
    has: le,
    add: Ze,
    set: ke,
    delete: et,
    clear: tt,
    forEach: ae(!1, !0)
  }, n = {
    get(o) {
      return ce(this, o, !0);
    },
    get size() {
      return ue(this, !0);
    },
    has(o) {
      return le.call(this, o, !0);
    },
    add: M("add"),
    set: M("set"),
    delete: M("delete"),
    clear: M("clear"),
    forEach: ae(!0, !1)
  }, r = {
    get(o) {
      return ce(this, o, !0, !0);
    },
    get size() {
      return ue(this, !0);
    },
    has(o) {
      return le.call(this, o, !0);
    },
    add: M("add"),
    set: M("set"),
    delete: M("delete"),
    clear: M("clear"),
    forEach: ae(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = fe(o, !1, !1), n[o] = fe(o, !0, !1), t[o] = fe(o, !1, !0), r[o] = fe(o, !0, !0);
  }), [
    e,
    n,
    t,
    r
  ];
}
const [yn, Rn, Dn, In] = /* @__PURE__ */ xn();
function ze(e, t) {
  const n = t ? e ? In : Dn : e ? Rn : yn;
  return (r, s, o) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(_(n, s) && s in r ? n : r, s, o);
}
const $n = {
  get: /* @__PURE__ */ ze(!1, !1)
}, Cn = {
  get: /* @__PURE__ */ ze(!0, !1)
}, Tn = {
  get: /* @__PURE__ */ ze(!0, !0)
};
function bt(e, t, n) {
  const r = f(n);
  if (r !== n && t.call(e, r)) {
    const s = pt(e);
    console.warn(`Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const Ot = /* @__PURE__ */ new WeakMap(), vn = /* @__PURE__ */ new WeakMap(), St = /* @__PURE__ */ new WeakMap(), Vt = /* @__PURE__ */ new WeakMap();
function Mn(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Pn(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Mn(pt(e));
}
function xt(e) {
  return H(e) ? e : He(e, !1, Sn, $n, Ot);
}
function yt(e) {
  return He(e, !0, wt, Cn, St);
}
function pe(e) {
  return He(e, !0, Vn, Tn, Vt);
}
function He(e, t, n, r, s) {
  if (!w(e))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = s.get(e);
  if (o)
    return o;
  const i = Pn(e);
  if (i === 0)
    return e;
  const c = new Proxy(e, i === 2 ? r : n);
  return s.set(e, c), c;
}
function J(e) {
  return H(e) ? J(e.__v_raw) : !!(e && e.__v_isReactive);
}
function H(e) {
  return !!(e && e.__v_isReadonly);
}
function _e(e) {
  return !!(e && e.__v_isShallow);
}
function Ie(e) {
  return J(e) || H(e);
}
function f(e) {
  const t = e && e.__v_raw;
  return t ? f(t) : e;
}
function Fn(e) {
  return on(e, "__v_skip", !0), e;
}
const se = (e) => w(e) ? xt(e) : e, Ke = (e) => w(e) ? yt(e) : e;
function An(e) {
  A && O && (e = f(e), process.env.NODE_ENV !== "production" ? De(e.dep || (e.dep = re()), {
    target: e,
    type: "get",
    key: "value"
  }) : De(e.dep || (e.dep = re())));
}
function jn(e, t) {
  e = f(e), e.dep && (process.env.NODE_ENV !== "production" ? G(e.dep, {
    target: e,
    type: "set",
    key: "value",
    newValue: t
  }) : G(e.dep));
}
function S(e) {
  return !!(e && e.__v_isRef === !0);
}
function zn(e) {
  return Hn(e, !1);
}
function Hn(e, t) {
  return S(e) ? e : new Kn(e, t);
}
class Kn {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : f(t), this._value = n ? t : se(t);
  }
  get value() {
    return An(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || _e(t) || H(t);
    t = n ? t : f(t), ne(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : se(t), jn(this, t));
  }
}
function Wn(e) {
  return S(e) ? e.value : e;
}
const Un = {
  get: (e, t, n) => Wn(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return S(s) && !S(n) ? (s.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function Bn(e) {
  return J(e) ? e : new Proxy(e, Un);
}
const L = [];
function Jn(e) {
  L.push(e);
}
function Ln() {
  L.pop();
}
function V(e, ...t) {
  mt();
  const n = L.length ? L[L.length - 1].component : null, r = n && n.appContext.config.warnHandler, s = qn();
  if (r)
    q(r, n, 11, [
      e + t.join(""),
      n && n.proxy,
      s.map(({ vnode: o }) => `at <${Kt(n, o.type)}>`).join(`
`),
      s
    ]);
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    s.length && o.push(`
`, ...Gn(s)), console.warn(...o);
  }
  Et();
}
function qn() {
  let e = L[L.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const r = e.component && e.component.parent;
    e = r && r.vnode;
  }
  return t;
}
function Gn(e) {
  const t = [];
  return e.forEach((n, r) => {
    t.push(...r === 0 ? [] : [`
`], ...Yn(n));
  }), t;
}
function Yn({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", r = e.component ? e.component.parent == null : !1, s = ` at <${Kt(e.component, e.type, r)}`, o = ">" + n;
  return e.props ? [s, ...Qn(e.props), o] : [s + o];
}
function Qn(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((r) => {
    t.push(...Rt(r, e[r]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Rt(e, t, n) {
  return D(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : S(t) ? (t = Rt(e, f(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : N(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = f(t), n ? t : [`${e}=`, t]);
}
const Dt = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function q(e, t, n, r) {
  let s;
  try {
    s = r ? e(...r) : e();
  } catch (o) {
    It(o, t, n);
  }
  return s;
}
function $e(e, t, n, r) {
  if (N(e)) {
    const o = q(e, t, n, r);
    return o && nn(o) && o.catch((i) => {
      It(i, t, n);
    }), o;
  }
  const s = [];
  for (let o = 0; o < e.length; o++)
    s.push($e(e[o], t, n, r));
  return s;
}
function It(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, c = process.env.NODE_ENV !== "production" ? Dt[n] : n;
    for (; o; ) {
      const p = o.ec;
      if (p) {
        for (let d = 0; d < p.length; d++)
          if (p[d](e, i, c) === !1)
            return;
      }
      o = o.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      q(u, null, 10, [e, i, c]);
      return;
    }
  }
  Xn(e, n, s, r);
}
function Xn(e, t, n, r = !0) {
  if (process.env.NODE_ENV !== "production") {
    const s = Dt[t];
    if (n && Jn(n), V(`Unhandled error${s ? ` during execution of ${s}` : ""}`), n && Ln(), r)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let ge = !1, Ce = !1;
const $ = [];
let F = 0;
const Q = [];
let v = null, P = 0;
const $t = /* @__PURE__ */ Promise.resolve();
let We = null;
const Zn = 100;
function kn(e) {
  const t = We || $t;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function er(e) {
  let t = F + 1, n = $.length;
  for (; t < n; ) {
    const r = t + n >>> 1;
    oe($[r]) < e ? t = r + 1 : n = r;
  }
  return t;
}
function Ue(e) {
  (!$.length || !$.includes(e, ge && e.allowRecurse ? F + 1 : F)) && (e.id == null ? $.push(e) : $.splice(er(e.id), 0, e), Ct());
}
function Ct() {
  !ge && !Ce && (Ce = !0, We = $t.then(vt));
}
function Tt(e) {
  h(e) ? Q.push(...e) : (!v || !v.includes(e, e.allowRecurse ? P + 1 : P)) && Q.push(e), Ct();
}
function tr(e) {
  if (Q.length) {
    const t = [...new Set(Q)];
    if (Q.length = 0, v) {
      v.push(...t);
      return;
    }
    for (v = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), v.sort((n, r) => oe(n) - oe(r)), P = 0; P < v.length; P++)
      process.env.NODE_ENV !== "production" && Mt(e, v[P]) || v[P]();
    v = null, P = 0;
  }
}
const oe = (e) => e.id == null ? 1 / 0 : e.id, nr = (e, t) => {
  const n = oe(e) - oe(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function vt(e) {
  Ce = !1, ge = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), $.sort(nr);
  const t = process.env.NODE_ENV !== "production" ? (n) => Mt(e, n) : ut;
  try {
    for (F = 0; F < $.length; F++) {
      const n = $[F];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        q(n, null, 14);
      }
    }
  } finally {
    F = 0, $.length = 0, tr(e), ge = !1, We = null, ($.length || Q.length) && vt(e);
  }
}
function Mt(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > Zn) {
      const r = t.ownerInstance, s = r && Ht(r.type);
      return V(`Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      e.set(t, n + 1);
  }
}
const Z = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (cn().__VUE_HMR_RUNTIME__ = {
  createRecord: Se(rr),
  rerender: Se(sr),
  reload: Se(or)
});
const me = /* @__PURE__ */ new Map();
function rr(e, t) {
  return me.has(e) ? !1 : (me.set(e, {
    initialDef: ee(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function ee(e) {
  return Wt(e) ? e.__vccOpts : e;
}
function sr(e, t) {
  const n = me.get(e);
  !n || (n.initialDef.render = t, [...n.instances].forEach((r) => {
    t && (r.render = t, ee(r.type).render = t), r.renderCache = [], r.update();
  }));
}
function or(e, t) {
  const n = me.get(e);
  if (!n)
    return;
  t = ee(t), nt(n.initialDef, t);
  const r = [...n.instances];
  for (const s of r) {
    const o = ee(s.type);
    Z.has(o) || (o !== n.initialDef && nt(o, t), Z.add(o)), s.appContext.optionsCache.delete(s.type), s.ceReload ? (Z.add(o), s.ceReload(t.styles), Z.delete(o)) : s.parent ? (Ue(s.parent.update), s.parent.type.__asyncLoader && s.parent.ceReload && s.parent.ceReload(t.styles)) : s.appContext.reload ? s.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
  }
  Tt(() => {
    for (const s of r)
      Z.delete(ee(s.type));
  });
}
function nt(e, t) {
  T(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Se(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (r) {
      console.error(r), console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
    }
  };
}
let W = null, ir = null;
const cr = (e) => e.__isSuspense;
function lr(e, t) {
  t && t.pendingBranch ? h(e) ? t.effects.push(...e) : t.effects.push(e) : Tt(e);
}
const rt = {};
function ur(e, t, { immediate: n, deep: r, flush: s, onTrack: o, onTrigger: i } = y) {
  process.env.NODE_ENV !== "production" && !t && (n !== void 0 && V('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), r !== void 0 && V('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const c = (g) => {
    V("Invalid watch source: ", g, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, u = X;
  let p, d = !1, l = !1;
  if (S(e) ? (p = () => e.value, d = _e(e)) : J(e) ? (p = () => e, r = !0) : h(e) ? (l = !0, d = e.some((g) => J(g) || _e(g)), p = () => e.map((g) => {
    if (S(g))
      return g.value;
    if (J(g))
      return Y(g);
    if (N(g))
      return q(g, u, 2);
    process.env.NODE_ENV !== "production" && c(g);
  })) : N(e) ? t ? p = () => q(e, u, 2) : p = () => {
    if (!(u && u.isUnmounted))
      return a && a(), $e(e, u, 3, [m]);
  } : (p = ut, process.env.NODE_ENV !== "production" && c(e)), t && r) {
    const g = p;
    p = () => Y(g());
  }
  let a, m = (g) => {
    a = R.onStop = () => {
      q(g, u, 4);
    };
  }, E = l ? [] : rt;
  const x = () => {
    if (!!R.active)
      if (t) {
        const g = R.run();
        (r || d || (l ? g.some((Bt, Jt) => ne(Bt, E[Jt])) : ne(g, E))) && (a && a(), $e(t, u, 3, [
          g,
          E === rt ? void 0 : E,
          m
        ]), E = g);
      } else
        R.run();
  };
  x.allowRecurse = !!t;
  let ie;
  s === "sync" ? ie = x : s === "post" ? ie = () => it(x, u && u.suspense) : (x.pre = !0, u && (x.id = u.uid), ie = () => Ue(x));
  const R = new pn(p, ie);
  return process.env.NODE_ENV !== "production" && (R.onTrack = o, R.onTrigger = i), t ? n ? x() : E = R.run() : s === "post" ? it(R.run.bind(R), u && u.suspense) : R.run(), () => {
    R.stop(), u && u.scope && en(u.scope.effects, R);
  };
}
function ar(e, t, n) {
  const r = this.proxy, s = D(e) ? e.includes(".") ? fr(r, e) : () => r[e] : e.bind(r, r);
  let o;
  N(t) ? o = t : (o = t.handler, n = t);
  const i = X;
  ct(this);
  const c = ur(s, o.bind(r), n);
  return i ? ct(i) : vr(), c;
}
function fr(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++)
      r = r[n[s]];
    return r;
  };
}
function Y(e, t) {
  if (!w(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), S(e))
    Y(e.value, t);
  else if (h(e))
    for (let n = 0; n < e.length; n++)
      Y(e[n], t);
  else if (at(e) || U(e))
    e.forEach((n) => {
      Y(n, t);
    });
  else if (dt(e))
    for (const n in e)
      Y(e[n], t);
  return e;
}
function pr(e) {
  return N(e) ? { setup: e, name: e.name } : e;
}
const dr = Symbol(), Te = (e) => e ? Mr(e) ? Pr(e) || e.proxy : Te(e.parent) : null, Ee = /* @__PURE__ */ T(/* @__PURE__ */ Object.create(null), {
  $: (e) => e,
  $el: (e) => e.vnode.el,
  $data: (e) => e.data,
  $props: (e) => process.env.NODE_ENV !== "production" ? pe(e.props) : e.props,
  $attrs: (e) => process.env.NODE_ENV !== "production" ? pe(e.attrs) : e.attrs,
  $slots: (e) => process.env.NODE_ENV !== "production" ? pe(e.slots) : e.slots,
  $refs: (e) => process.env.NODE_ENV !== "production" ? pe(e.refs) : e.refs,
  $parent: (e) => Te(e.parent),
  $root: (e) => Te(e.root),
  $emit: (e) => e.emit,
  $options: (e) => gr(e),
  $forceUpdate: (e) => e.f || (e.f = () => Ue(e.update)),
  $nextTick: (e) => e.n || (e.n = kn.bind(e.proxy)),
  $watch: (e) => ar.bind(e)
}), hr = (e) => e === "_" || e === "$", _r = {
  get({ _: e }, t) {
    const { ctx: n, setupState: r, data: s, props: o, accessCache: i, type: c, appContext: u } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    if (process.env.NODE_ENV !== "production" && r !== y && r.__isScriptSetup && _(r, t))
      return r[t];
    let p;
    if (t[0] !== "$") {
      const m = i[t];
      if (m !== void 0)
        switch (m) {
          case 1:
            return r[t];
          case 2:
            return s[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (r !== y && _(r, t))
          return i[t] = 1, r[t];
        if (s !== y && _(s, t))
          return i[t] = 2, s[t];
        if ((p = e.propsOptions[0]) && _(p, t))
          return i[t] = 3, o[t];
        if (n !== y && _(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const d = Ee[t];
    let l, a;
    if (d)
      return t === "$attrs" && (I(e, "get", t), process.env.NODE_ENV !== "production" && void 0), d(e);
    if ((l = c.__cssModules) && (l = l[t]))
      return l;
    if (n !== y && _(n, t))
      return i[t] = 4, n[t];
    if (a = u.config.globalProperties, _(a, t))
      return a[t];
    process.env.NODE_ENV !== "production" && W && (!D(t) || t.indexOf("__v") !== 0) && (s !== y && hr(t[0]) && _(s, t) ? V(`Property ${JSON.stringify(t)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : e === W && V(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`));
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: s, ctx: o } = e;
    return s !== y && _(s, t) ? (s[t] = n, !0) : r !== y && _(r, t) ? (r[t] = n, !0) : _(e.props, t) ? (process.env.NODE_ENV !== "production" && V(`Attempting to mutate prop "${t}". Props are readonly.`, e), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && V(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`, e), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: s, propsOptions: o } }, i) {
    let c;
    return !!n[i] || e !== y && _(e, i) || t !== y && _(t, i) || (c = o[0]) && _(c, i) || _(r, i) || _(Ee, i) || _(s.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : _(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (_r.ownKeys = (e) => (V("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(e)));
function gr(e) {
  const t = e.type, { mixins: n, extends: r } = t, { mixins: s, optionsCache: o, config: { optionMergeStrategies: i } } = e.appContext, c = o.get(t);
  let u;
  return c ? u = c : !s.length && !n && !r ? u = t : (u = {}, s.length && s.forEach((p) => Ne(u, p, i, !0)), Ne(u, t, i)), w(t) && o.set(t, u), u;
}
function Ne(e, t, n, r = !1) {
  const { mixins: s, extends: o } = t;
  o && Ne(e, o, n, !0), s && s.forEach((i) => Ne(e, i, n, !0));
  for (const i in t)
    if (r && i === "expose")
      process.env.NODE_ENV !== "production" && V('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const c = mr[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const mr = {
  data: st,
  props: K,
  emits: K,
  methods: K,
  computed: K,
  beforeCreate: b,
  created: b,
  beforeMount: b,
  mounted: b,
  beforeUpdate: b,
  updated: b,
  beforeDestroy: b,
  beforeUnmount: b,
  destroyed: b,
  unmounted: b,
  activated: b,
  deactivated: b,
  errorCaptured: b,
  serverPrefetch: b,
  components: K,
  directives: K,
  watch: Nr,
  provide: st,
  inject: Er
};
function st(e, t) {
  return t ? e ? function() {
    return T(N(e) ? e.call(this, this) : e, N(t) ? t.call(this, this) : t);
  } : t : e;
}
function Er(e, t) {
  return K(ot(e), ot(t));
}
function ot(e) {
  if (h(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function b(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function K(e, t) {
  return e ? T(T(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function Nr(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = T(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = b(e[r], t[r]);
  return n;
}
function wr() {
  return {
    app: null,
    config: {
      isNativeTag: Xt,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
const it = lr, br = (e) => e.__isTeleport, Be = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), Or = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), Sr = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0);
Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0);
const de = [];
let C = null;
function Vr(e = !1) {
  de.push(C = e ? null : []);
}
function xr() {
  de.pop(), C = de[de.length - 1] || null;
}
function yr(e) {
  return e.dynamicChildren = C || Qt, xr(), C && C.push(e), e;
}
function Rr(e, t, n, r, s, o) {
  return yr(te(e, t, n, r, s, o, !0));
}
function Dr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const Ir = (...e) => At(...e), Pt = "__vInternal", Ft = ({ key: e }) => e != null ? e : null, he = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? D(e) || S(e) || N(e) ? { i: W, r: e, k: t, f: !!n } : e : null;
function te(e, t = null, n = null, r = 0, s = null, o = e === Be ? 0 : 1, i = !1, c = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ft(t),
    ref: t && he(t),
    scopeId: ir,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null
  };
  return c ? (Je(u, n), o & 128 && e.normalize(u)) : n && (u.shapeFlag |= D(n) ? 8 : 16), process.env.NODE_ENV !== "production" && u.key !== u.key && V("VNode created with invalid key (NaN). VNode type:", u.type), !i && C && (u.patchFlag > 0 || o & 6) && u.patchFlag !== 32 && C.push(u), u;
}
const $r = process.env.NODE_ENV !== "production" ? Ir : At;
function At(e, t = null, n = null, r = 0, s = null, o = !1) {
  if ((!e || e === dr) && (process.env.NODE_ENV !== "production" && !e && V(`Invalid vnode type when creating vnode: ${e}.`), e = Sr), Dr(e)) {
    const c = we(e, t, !0);
    return n && Je(c, n), !o && C && (c.shapeFlag & 6 ? C[C.indexOf(e)] = c : C.push(c)), c.patchFlag |= -2, c;
  }
  if (Wt(e) && (e = e.__vccOpts), t) {
    t = Cr(t);
    let { class: c, style: u } = t;
    c && !D(c) && (t.class = Me(c)), w(u) && (Ie(u) && !h(u) && (u = T({}, u)), t.style = ve(u));
  }
  const i = D(e) ? 1 : cr(e) ? 128 : br(e) ? 64 : w(e) ? 4 : N(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && Ie(e) && (e = f(e), V("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, e)), te(e, t, n, r, s, i, o, !0);
}
function Cr(e) {
  return e ? Ie(e) || Pt in e ? T({}, e) : e : null;
}
function we(e, t, n = !1) {
  const { props: r, ref: s, patchFlag: o, children: i } = e, c = t ? Tr(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && Ft(c),
    ref: t && t.ref ? n && s ? h(s) ? s.concat(he(t)) : [s, he(t)] : he(t) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && o === -1 && h(i) ? i.map(jt) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Be ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && we(e.ssContent),
    ssFallback: e.ssFallback && we(e.ssFallback),
    el: e.el,
    anchor: e.anchor
  };
}
function jt(e) {
  const t = we(e);
  return h(e.children) && (t.children = e.children.map(jt)), t;
}
function zt(e = " ", t = 0) {
  return $r(Or, null, e, t);
}
function Je(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (h(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Je(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(Pt in t) ? t._ctx = W : s === 3 && W && (W.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    N(t) ? (t = { default: t, _ctx: W }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [zt(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Tr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = Me([t.class, r.class]));
      else if (s === "style")
        t.style = ve([t.style, r.style]);
      else if (kt(s)) {
        const o = t[s], i = r[s];
        i && o !== i && !(h(o) && o.includes(i)) && (t[s] = o ? [].concat(o, i) : i);
      } else
        s !== "" && (t[s] = r[s]);
  }
  return t;
}
wr();
let X = null;
const ct = (e) => {
  X = e, e.scope.on();
}, vr = () => {
  X && X.scope.off(), X = null;
};
function Mr(e) {
  return e.vnode.shapeFlag & 4;
}
function Pr(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Bn(Fn(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in Ee)
          return Ee[n](e);
      }
    }));
}
const Fr = /(?:^|[-_])(\w)/g, Ar = (e) => e.replace(Fr, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Ht(e, t = !0) {
  return N(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Kt(e, t, n = !1) {
  let r = Ht(t);
  if (!r && t.__file) {
    const s = t.__file.match(/([^/\\]+)\.\w+$/);
    s && (r = s[1]);
  }
  if (!r && e && e.parent) {
    const s = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    r = s(e.components || e.parent.type.components) || s(e.appContext.components);
  }
  return r ? Ar(r) : n ? "App" : "Anonymous";
}
function Wt(e) {
  return N(e) && "__vccOpts" in e;
}
Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : "");
function Ve(e) {
  return !!(e && e.__v_isShallow);
}
function jr() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, r = { style: "color:#9d288c" }, s = {
    header(l) {
      return w(l) ? l.__isVue ? ["div", e, "VueInstance"] : S(l) ? [
        "div",
        {},
        ["span", e, d(l)],
        "<",
        c(l.value),
        ">"
      ] : J(l) ? [
        "div",
        {},
        ["span", e, Ve(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${H(l) ? " (readonly)" : ""}`
      ] : H(l) ? [
        "div",
        {},
        ["span", e, Ve(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...o(l.$)
        ];
    }
  };
  function o(l) {
    const a = [];
    l.type.props && l.props && a.push(i("props", f(l.props))), l.setupState !== y && a.push(i("setup", l.setupState)), l.data !== y && a.push(i("data", f(l.data)));
    const m = u(l, "computed");
    m && a.push(i("computed", m));
    const E = u(l, "inject");
    return E && a.push(i("injected", E)), a.push([
      "div",
      {},
      [
        "span",
        {
          style: r.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), a;
  }
  function i(l, a) {
    return a = T({}, a), Object.keys(a).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(a).map((m) => [
          "div",
          {},
          ["span", r, m + ": "],
          c(a[m], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, a = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", r, l] : w(l) ? ["object", { object: a ? f(l) : l }] : ["span", n, String(l)];
  }
  function u(l, a) {
    const m = l.type;
    if (N(m))
      return;
    const E = {};
    for (const x in l.ctx)
      p(m, x, a) && (E[x] = l.ctx[x]);
    return E;
  }
  function p(l, a, m) {
    const E = l[m];
    if (h(E) && E.includes(a) || w(E) && a in E || l.extends && p(l.extends, a, m) || l.mixins && l.mixins.some((x) => p(x, a, m)))
      return !0;
  }
  function d(l) {
    return Ve(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
function zr() {
  jr();
}
process.env.NODE_ENV !== "production" && zr();
const Hr = /* @__PURE__ */ zt(" hogehoge "), Kr = { class: "card" }, Ut = /* @__PURE__ */ pr({
  __name: "Hoge",
  props: {
    msg: String
  },
  setup(e) {
    const t = zn(0);
    return (n, r) => (Vr(), Rr(Be, null, [
      Hr,
      te("h1", null, Le(e.msg), 1),
      te("div", Kr, [
        te("button", {
          type: "button",
          onClick: r[0] || (r[0] = (s) => t.value++)
        }, "count is " + Le(t.value), 1)
      ])
    ], 64));
  }
}), Br = Ut, Wr = { Hoge: Ut }, Ur = (e) => {
  let t = "", n = !1;
  for (const r of e) {
    const s = r.toUpperCase() === r;
    s && n && (t += "-"), t += r, n = !s;
  }
  return t.replace(/-+/g, "-").toLowerCase();
}, Jr = {
  install(e) {
    Object.entries(Wr).forEach(([t, n]) => {
      const r = Ur(t);
      e.component(`my-${r}`, n);
    });
  }
};
export {
  Br as MyHoge,
  Jr as default
};
