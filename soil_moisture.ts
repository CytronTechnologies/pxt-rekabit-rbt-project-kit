/*******************************************************************************
 * Functions for Maker Soil Moisture sensor.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/


// Analog input pins.
enum RekabitAnalogInPin {
    //% block="P0"
    P0 = AnalogPin.P0,
    //% block="P1"
    P1 = AnalogPin.P1,
    //% block="P2"
    P2 = AnalogPin.P2
}


// Comparison type.
enum AnalogCompareType {
    //% block=">"
    MoreThan = 0,

    //% block="<"
    LessThan = 1
};



/**
 * Blocks for Maker Soil Moisture sensor.
 */
//% weight=7 color=#ff8000 icon="\uf043" block="Soil Moisture"
namespace soilMoisture {
    
    
    /**
     * Return soil moisture level (0-1023).
     * @param pin Soil moisture analog pin.
     */
    //% weight=20
    //% blockGap=12
    //% blockId=soil_moisture_level
    //% block="soil moisture level at pin %pin"
    export function soilMoistureLevel(pin: RekabitAnalogInPin): number {
        return pins.analogReadPin(<number>pin);
    }


    /**
    * Compare the soil moisture level (0-1023) with a number and return the result (true/false).
    * @param pin Soil moisture analog pin.
    * @param compareType More than or less than.
    * @param threshold The value to compare with. eg: 512
    */
    //% weight=19
    //% blockGap=40
    //% blockId=soil_moisture_compare_value
    //% block="soil moisture level at pin %pin %compareType %threshold"
    //% threshold.min=0 threshold.max=1023
    export function compareAnalog(pin: RekabitAnalogInPin, compareType: AnalogCompareType, threshold: number): boolean {
        let result = false;
        switch (compareType) {
            case AnalogCompareType.MoreThan:
                if (soilMoistureLevel(pin) > threshold) {
                    result = true;
                }
                break;

            case AnalogCompareType.LessThan:
                if (soilMoistureLevel(pin) < threshold) {
                    result = true;
                }
                break;
        }
        return result;
    }

}