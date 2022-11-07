/*******************************************************************************
 * Functions for Big LED.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// IO state.
enum DigitalIoState {
    //% block="off"
    Off = 0,

    //% block="on"
    On = 1,
}



/**
 * Blocks for Big LED.
 */
//% weight=8 color=#ff8000 icon="\uf0eb" block="Big LED"
namespace bigLed {

    
    /**
     * Turn on/off the Big LED (On = 1, Off = 0).
     * @param pin LED pin. eg: DigitalPin.P13
     * @param state LED state.
     */
    //% weight=20
    //% blockGap=8
    //% blockId=big_led_set_big_led
    //% block="set Big LED at pin %pin to %state"
    //% state.shadow=edubit_digital_state_picker
    export function setBigLed(pin: DigitalPin, state: number): void {
        // Limit the number.
        state = rekabit.limit(state, 0, 1);

        // Write to pin.
        pins.digitalWritePin(<number>pin, state);
    }


    /**
     * Get the digital IO state field editor.
     * @param state Digital IO state. eg: DigitalIoState.On
     */
    //% blockHidden=true
    //% colorSecondary="#ff8000"
    //% blockId="edubit_digital_state_picker"
    //% block="%state"
    export function digitalStatePicker(state: DigitalIoState): number {
        return <number>state;
    }
}