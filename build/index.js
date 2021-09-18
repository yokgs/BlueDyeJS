let app = Vue.createApp({
  data() {
    return {
      rawcolor: '',
      color: bluedye(),
      bluedye: bluedye,
      light: 10,
      dark: 10,
      red: 0,
      green: 123,
      blue: 255,
      alpha: 1,
      name:'my-dye',
      on: false
    }
  },
  methods: {
    updateColor() {
      this.color = bluedye(colorFormatter(this.rawcolor));
    },
    applyMethod(m) {

    },
    switchOn() {
      this.on = !this.on;
    }
  }
});
let colorFormatter = function(s) {
  if (/^\[[\d\s\.\-,]+\]$/.test(s)) {
    return eval(s);
  }
  if (/^[\d]+$/.test(s)) {
    return Number(s);
  }
  if (s === 'false' || s === 'true') {
    return s === 'true';
  }
  if (s === 'undefined' || s === 'null' || s === 'NaN') {
    return eval(s);
  }
  return s;
};
app.mount('#app')