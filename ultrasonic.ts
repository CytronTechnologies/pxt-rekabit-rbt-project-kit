/*******************************************************************************
 * Functions for Ultrasonic sensor.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// Default ultrasonic sensor pins.
let usTrigPin = DigitalPin.P2
let usEchoPin = DigitalPin.P12

const MAX_DISTANCE = 300


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
    let usDistance = MAX_DISTANCE
    let usFlag = 0

    // Background function to read ultrasonic sensor distance at 200ms interval.
    control.inBackground(function () {
        while (true) {
            if (usFlag == 1) {      // Wait for read ultrasonic command
                // Transmit a pulse.
                pins.digitalWritePin(usTrigPin, 0)
                control.waitMicros(2)
                pins.digitalWritePin(usTrigPin, 1)
                control.waitMicros(10)
                pins.digitalWritePin(usTrigPin, 0)

                // Read the echo.
                const pulse = pins.pulseIn(usEchoPin, PulseValue.High, MAX_DISTANCE * const_2divspeed)

                // No echo detected.
                if (pulse == 0) {
                    usDistance = MAX_DISTANCE
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
     * Set ultrasonic Trig and Echo pins.
     * @param trig Trig pin. eg: RekaBitIOPins.P2
     * @param echo Echo pin. eg: RekaBitIOPins.P12
     */
    //% weight=20
    //% blockGap=40
    //% blockId=set_ultrasonic_trig_echo
    //% block="set Ultrasonic Trig to pin %trig & Echo to pin %echo"
    export function setUltrasonicTrigEcho(trig: RekaBitIOPins, echo: RekaBitIOPins): void {
        
        usTrigPin = <number>trig
        usEchoPin = <number>echo

    }
    
    
    /**
     * Return distance measured by ultrasonic sensor in centimeters (cm).
     * Distance = 1cm - MAX_DISTANCE. Return MAX_DISTANCE if distance is > MAX_DISTANCE or no echo is detected.
     */
    //% weight=19
    //% blockGap=12
    //% blockId=read_ultrasonic
    //% block="ultrasonic distance (cm)"
    export function readUltrasonic(): number {
        if (usFlag == 0) {
            usFlag = 1          // Enable ultrasonic reading in background
            basic.pause(300)
        }
        return usDistance
    }


    /**
    * Compare the distance measured (1-300cm) with a number and return the result (true/false).
    * @param compareType More than or less than. eg: AnalogCompareType.LessThan
    * @param threshold The value to compare with. eg: 50
    */
    //% weight=18
    //% blockGap=12
    //% blockId=ultrasonic_compare_value
    //% block="ultrasonic distance %compareType %threshold cm"
    //% threshold.min=1 threshold.max=MAX_DISTANCE
    export function compareDistance(compareType: AnalogCompareType, threshold: number): boolean {
        let result = false;
        switch (compareType) {
            case AnalogCompareType.MoreThan:
                if (readUltrasonic() > threshold) {
                    result = true;
                }
                break;

            case AnalogCompareType.LessThan:
                if (readUltrasonic() < threshold) {
                    result = true;
                }
                break;
        }
        return result;
    }
}