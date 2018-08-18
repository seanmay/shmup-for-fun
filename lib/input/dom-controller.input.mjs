import { DOMInput } from "./dom.input.mjs";

const noop = () => {};

class DOMControllerInput extends DOMInput {
  constructor ({ controllerconnected = noop, controllerdisconnected = noop }) {
    super(["controllerconnected", "controllerdisconnected"]);
    this.controllerconnected = controllerconnected;
    this.controllerdisconnected = controllerdisconnected;
  }
}


export const DOMControllers = () => {
  const connection = new DOMControllerInput({
    controllerconnected: e => {
      console.log("CONNECTED");
      e.controller.vibrationActuator.playEffect("dual-rumble", {
        duration: 1000,
        strongMagnitude: 1,
        weakMagnitude: 1
      });
    }
  });


  return {
    connect: e => {
      console.log("CONNECTING");
      connection.register(e);
    },
    disconnect: e => connection.unregister(e),
  };
};