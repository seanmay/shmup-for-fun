import { DOMInput } from "./dom.input.mjs";

const noop = () => {};

export class DOMKeyboardInput extends DOMInput {
  constructor ({ keyup = noop, keydown = noop }) {
    super(["keyup", "keydown"]);
    this.keyup = keyup;
    this.keydown = keydown;
  }
}

export const DOMKeyboard = ({ debug = false } = { debug: false }) => {
  const keys = {};
  const input = new DOMKeyboardInput({
    keydown: e => {
      if (debug) console.table(e);
      keys[e.code] = true;
    },
    keyup: e => {
      if (debug) console.table(e);
      keys[e.code] = false;
    }
  });

  let source = null;

  const connect = el => {
    if (el == null) return;
    source = el;
    input.register(source);
  };

  const disconnect = () => {
    if (!source) return;
    input.unregister(source);
    source = null;
  };
 
  return {
    connect,
    disconnect,
    isKeyPressed: code => keys[code],
    getState: () => keys 
  };
};