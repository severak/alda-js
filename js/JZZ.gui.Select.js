(function(global, factory) {
  /* istanbul ignore next */
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory;
  }
  else if (typeof define === 'function' && define.amd) {
    define('JZZ.gui.Select', ['JZZ'], factory);
  }
  else {
    factory(JZZ);
  }
})(this, function(JZZ) {

  if (!JZZ.gui) JZZ.gui = {};
  if (JZZ.gui.SelectMidiIn) return;

  function _param(arg) {
    var param = {};
    if (!arg || !arg.at) {
      throw 'missing parameter';
    }
    param.at = arg.at;
    param.none = arg.none || '=== NONE ===';
    if (typeof param.at == 'string') param.at = document.getElementById(param.at);
    return param;
  }
  function _update(self, ports) {
    var i;
    var arr = [self._none];
    if (ports) for (i = 0; i < ports.length; i++) arr.push(ports[i].name);
    for (i = self._sel.options.length - 1; i >= 0; i--) self._sel.remove(i);
    for (i = 0; i < arr.length; i++) self._sel[i] = new Option(arr[i], arr[i], arr[i] == self._name, arr[i] == self._name);
  }
  function _init(self, arg) {
    var param = _param(arg);
    self._sel = param.at;
    self._none = param.none;
    self.select(self._none);
    self._sel.addEventListener('change', function() { self.select(self._sel.options[self._sel.selectedIndex].value); });
  }
  function _onSelect(self, name) { setTimeout(function() { self.onSelect(name); }, 0); }

  function SelectMidiIn(arg) {
    if (!(this instanceof SelectMidiIn)) return new SelectMidiIn(arg);
    var self = this;
    _init(self, arg);
  }
  SelectMidiIn.prototype = new JZZ.Widget();
  SelectMidiIn.prototype.constructor = SelectMidiIn;
  SelectMidiIn.prototype.onSelect = function() {};
  SelectMidiIn.prototype.select = function(arg) {
    var self = this;
    if (arg == self._name) return;
    if (arg == self._none) {
      if (self._port) {
        self._port.disconnect(self);
        self._port.close();
      }
      self._port = undefined;
      self._name = self._none;
      _update(self, JZZ().info().inputs);
      _onSelect(self, self._name);
    }
    JZZ().openMidiIn(arg).or(function() {
      _update(self, JZZ().info().inputs);
    }).and(function() {
      if (self._port) {
        self._port.disconnect(self);
        self._port.close();
      }
      self._port = this;
      self._name = this.info().name;
      self._port.connect(self);
      _update(self, JZZ().info().inputs);
      _onSelect(self, self._name);
    });
  };

  function SelectMidiOut(arg) {
    if (!(this instanceof SelectMidiOut)) return new SelectMidiOut(arg);
    var self = this;
    _init(self, arg);
  }
  SelectMidiOut.prototype = new JZZ.Widget();
  SelectMidiOut.prototype.constructor = SelectMidiOut;
  SelectMidiOut.prototype.onSelect = function() {};
  SelectMidiOut.prototype.select = function(arg) {
    var self = this;
    if (arg == self._name) return;
    if (arg == self._none) {
      if (self._port) {
        self.disconnect(self._port);
        self._port.close();
      }
      self._port = undefined;
      self._name = self._none;
      _update(self, JZZ().info().outputs);
      _onSelect(self, self._name);
    }
    JZZ().openMidiOut(arg).or(function() {
      _update(self, JZZ().info().outputs);
    }).and(function() {
      if (self._port) {
        self.disconnect(self._port);
        self._port.close();
      }
      self._port = this;
      self._name = this.info().name;
      self.connect(self._port);
      _update(self, JZZ().info().outputs);
      _onSelect(self, self._name);
    });
  };

  JZZ.gui.SelectMidiIn = SelectMidiIn;
  JZZ.gui.SelectMidiOut = SelectMidiOut;

});
