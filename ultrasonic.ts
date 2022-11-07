/*******************************************************************************
 * Functions for Ultrasonic sensor.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// Default ultrasonic sensor pins.
const US_TRIG_PIN = DigitalPin.P2
const US_ECHO_PIN = DigitalPin.P12


// Obtain micro:bit board version 
// Ref: https://support.microbit.org/support/solutions/articles/19000130254-identify-the-version-number-of-the-micro-bit-in-your-program
const board_ver = control.hardwareVersion()

// Tuning for different microbit versions to get a more accurate value in cm
let const_2divspeed = 58
if (board_ver == "1") {
    const_2divspeed = 39
}



/**
 * Blocks for Ultrasonic sensor.
 */
//% weight=6 color=#ff8000 icon="\uf2ce" block="Ultrasonic"
namespace ultrasonic {

    // Ultrasonic sensor distance.
    let usDistance = 255
    let usFlag = 0

    // Background function to read ultrasonic sensor distance at 200ms interval.
    control.inBackground(function () {
        while (1) {
            if (usFlag == 1) {      // Wait for read ultrasonic command
                // Transmit a pulse.
                pins.digitalWritePin(US_TRIG_PIN, 0)
                control.waitMicros(2)
                pins.digitalWritePin(US_TRIG_PIN, 1)
                control.waitMicros(10)
                pins.digitalWritePin(US_TRIG_PIN, 0)

                // Read the echo.
                const pulse = pins.pulseIn(US_ECHO_PIN, PulseValue.High, 255 * const_2divspeed)

                // No echo detected.
                if (pulse == 0) {
                    usDistance = 255
                }
                else {
                    usDistance = Math.idiv(pulse, const_2divspeed)
                }
                basic.pause(200);   // Recommended minimum time between readings 
                // for ultrasonic model RCWL-9610 is 200ms.
            }
            else {
                basic.pause(50);    // Allow the other fibers to run.
            }
        }
    })


    /**
     * Return distance measured by ultrasonic sensor in centimeters (cm).
     * Distance = 1cm - 255cm. Return '255' if distance is > 255cm or no echo is detected.
     */
    //% weight=20
    //% blockGap=8
    //% blockId=read_ultrasonic
    //% block="ultrasonic distance (cm)"
    export function readUltrasonic(): number {
        if (usFlag == 0) {
            usFlag = 1          // Enable ultrasonic reading in background
            basic.pause(300)
        }
        return usDistance
    }

}