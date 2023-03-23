/*******************************************************************************
 * Functions for Ultrasonic sensor.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/


enum RekabitUltrasonicIOPins {
    //% block="Trig:P0 | Echo:P1"
    p0_p1 = 0,
    //% block="Trig:P1 | Echo:P9"
    p1_p9 = 1,
    //% block="Trig:P2 | Echo:P12"
    p2_p12 = 2,
    //% block="Trig:P13 | Echo:P14"
    p13_p14 = 3,
    //% block="Trig:P15 | Echo:P16"
    p15_p16 = 4
}


// Declare ultrasonic sensor pins.
let rekabitUsTrigPin = 0
let rekabitUsEchoPin = 0

const REKABIT_MAX_DISTANCE = 300


// Obtain micro:bit board version 
// Ref: https://support.microbit.org/support/solutions/articles/19000130254-identify-the-version-number-of-the-micro-bit-in-your-program
const REKABIT_MICROBIT_VERSION = control.hardwareVersion()

// Tuning for different microbit versions to get a more accurate value in cm
let rekabit_2divspeed = 58
if (REKABIT_MICROBIT_VERSION == "1") {
    rekabit_2divspeed = 39
}



/**
 * Blocks for Ultrasonic sensor.
 */
//% weight=6 color=#ff8000 icon="\uf2ce" block="Ultrasonic"
namespace rekabitUltrasonic {

    // Ultrasonic sensor distance.
    let usDistance = REKABIT_MAX_DISTANCE
    let usFlag = 0

    // Background function to read ultrasonic sensor distance at 200ms interval.
    control.inBackground(function () {
        while (true) {
            if (usFlag == 1) {      // Wait for read ultrasonic command
                // Transmit a pulse.
                pins.digitalWritePin(rekabitUsTrigPin, 0)
                control.waitMicros(2)
                pins.digitalWritePin(rekabitUsTrigPin, 1)
                control.waitMicros(10)
                pins.digitalWritePin(rekabitUsTrigPin, 0)

                // Read the echo.
                // The maximum duration need to add in 20ms of deadzone.
                const pulse = pins.pulseIn(rekabitUsEchoPin, PulseValue.High, REKABIT_MAX_DISTANCE * rekabit_2divspeed + 20000)

                // No echo detected.
                if (pulse == 0) {
                    usDistance = REKABIT_MAX_DISTANCE
                }
                else {
                    usDistance = Math.idiv(pulse, rekabit_2divspeed)
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
     * @param pins Trig & Echo pins. eg: 
     */
    //% weight=20
    //% blockGap=40
    //% blockId=set_ultrasonic_trig_echo
    //% block="set Ultrasonic pins to %pins"
    export function setUltrasonicTrigEcho(pins: RekabitUltrasonicIOPins): void {
        
        switch (pins) {
            case RekabitUltrasonicIOPins.p0_p1:
                rekabitUsTrigPin = DigitalPin.P0
                rekabitUsEchoPin = DigitalPin.P1
                break;

            case RekabitUltrasonicIOPins.p1_p9:
                rekabitUsTrigPin = DigitalPin.P1
                rekabitUsEchoPin = DigitalPin.P9
                break;
            
            case RekabitUltrasonicIOPins.p2_p12:
                rekabitUsTrigPin = DigitalPin.P2
                rekabitUsEchoPin = DigitalPin.P12
                break;
            
            case RekabitUltrasonicIOPins.p13_p14:
                rekabitUsTrigPin = DigitalPin.P13
                rekabitUsEchoPin = DigitalPin.P14
                break;

            case RekabitUltrasonicIOPins.p15_p16:
                rekabitUsTrigPin = DigitalPin.P15
                rekabitUsEchoPin = DigitalPin.P16
                break;
        }
    }
    
    
    /**
     * Return distance measured by ultrasonic sensor in centimeters (cm).
     * Distance = 1cm - MAX_DISTANCE. Return MAX_DISTANCE if distance is > MAX_DISTANCE or no echo is detected.
     */
    //% weight=19
    //% blockGap=12
    //% blockId=read_ultrasonic
    //% block="ultrasonic distance (cm)"
    export function ultrasonicDistance(): number {
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
    export function compareDistance(compareType: RekabitAnalogCompareType, threshold: number): boolean {
        let result = false;
        switch (compareType) {
            case RekabitAnalogCompareType.MoreThan:
                if (ultrasonicDistance() > threshold) {
                    result = true;
                }
                break;

            case RekabitAnalogCompareType.LessThan:
                if (ultrasonicDistance() < threshold) {
                    result = true;
                }
                break;
        }
        return result;
    }
}