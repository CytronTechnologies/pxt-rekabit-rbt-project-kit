/*******************************************************************************
 * Functions for RGB LED Stick.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// Number of LEDs in RGB Bit.
const RGB_STICK_LENGTH = 8;


/**
 * Blocks for RGB LED Stick.
 */
//% weight=9 color=#ff8000 icon="\uf110" block="RGB Stick"
namespace rgb_stick {

    // Create RGB Stick as Neopixel Strp
    let rgb_stick: neopixel.Strip;

    // Colors array for each pixel.
    let colorsArray: number[] = [];
    for (let i = 0; i < RGB_STICK_LENGTH; i++) {
        colorsArray.push(0);
    }

    
    /**
     * Create a new Neopixel driver for RGB Stick.
     * @param pin the pin where the RGB Stick is connected.
     */
    //% blockId="rgb_stick_create" 
    //% block="set RGB Stick at pin %pin"
    //% weight=21 blockGap=40
    export function create(pin: RekaBitIOPins): void {
    
        rgb_stick = neopixel.create(<number>pin, RGB_STICK_LENGTH, NeoPixelMode.RGB);
        rgb_stick.clear();

        // Reduce the default brightness.
        rgb_stick.setBrightness(25);
    }


    /**
     * Turn off RGB Stick.
     */
    //% weight=20
    //% blockGap=8
    //% blockId="rgb_stick_turnoff"
    //% block="turn off RGB Stick"
    export function turnoff(): void {
        
        for (let i = 0; i < RGB_STICK_LENGTH; i++) {
            colorsArray[i] = 0;
        }

        rgb_stick.clear();
        rgb_stick.show();
        basic.pause(0);
    }


    /**
     * Set the brightness of the RGB Stick pixels (0-255).
     * @param brightness Pixel brightness. eg: 25
     */
    //% weight=19
    //% blockGap=40
    //% blockId="rgb_stick_set_brightness"
    //% block="set RGB Stick brightness to %brightness"
    //% brightness.min=0 brightness.max=255
    export function setBrightness(brightness: number): void {
        //rgb_stick.setBrightness(brightness);
        rgb_stick.brightness = brightness & 0xff;

        // Restore the previous color.
        for (let i = 0; i < RGB_STICK_LENGTH; i++) {
            rgb_stick.setPixelColor(i, colorsArray[i]);
        }
        rgb_stick.show();
        basic.pause(0);
    }


    /**
     * Show a rainbow pattern on RGB Stick pixels.
     */
    //% weight=18
    //% blockGap=8
    //% blockId="rgb_stick_show_rainbow"
    //% block="show rainbow on RGB Stick"
    export function showRainbow(): void {
        rgb_stick.showRainbow(1, 340)
        rgb_stick.show();
        
        //for (let i = 0; i < RGB_STICK_LENGTH; i++) {
        //    colorsArray[i] = neopixel.rgb(rgb_stick.buf[(i * 3) + 0], rgb_stick.buf[(i * 3) + 1], rgb_stick.buf[(i * 3) + 2])
        //}
        basic.pause(0);
    }


    
    /**
     * Show the same color on RGB Stick. 
     * @param color RGB color of the pixel.
     */
    //% weight=17
    //% blockGap=8
    //% blockId="rgb_stick_show_color"
    //% block="set RGB Stick to %color"
    //% color.shadow="colorNumberPicker"
    export function showColor(color: number): void {
        
        for (let i = 0; i < RGB_STICK_LENGTH; i++) {
            colorsArray[i] = color;
        }
        rgb_stick.showColor(color);
        basic.pause(0);
    }


    /**
     * Show color on individual pixel of the RGB Stick.
     * @param pixel The pixel number we want to change the color.
     * @param color RGB color of the pixel.
     */
    //% weight=16
    //% blockGap=40
    //% blockId="rgb_stick_set_pixel_color"
    //% block="set RGB Stick pixel %pixel to %color"
    //% color.shadow="colorNumberPicker"
    //% pixel.min=0 pixel.max=7
    export function setPixelColor(pixel: number, color: number): void {
        colorsArray[pixel] = color;
        rgb_stick.setPixelColor(pixel, color);
        rgb_stick.show();
        basic.pause(0);
    }


    /**
     * Shift the color of RGB Stick (-7 to 7).
     * @param offset Number of pixels to shift. eg: 1
     */
    //% weight=15
    //% blockGap=8
    //% blockId="rgb_stick_shift_pixels"
    //% block="shift RGB Stick pixels color by %offset"
    //% offset.min=-7 offset.max=7
    export function shiftPixels(offset: number): void {
        // Do nothing if offset is 0.
        if (offset == 0) {
            return;
        }

        // Shift forward.
        else if (offset > 0) {
            while (offset-- > 0) {
                for (let i = RGB_STICK_LENGTH - 1; i > 0; i--) {
                    colorsArray[i] = colorsArray[i - 1];
                }
                colorsArray[0] = 0;
            }
        }

        // Shift backward.
        else {
            offset = -offset;
            while (offset-- > 0) {
                for (let i = 0; i < RGB_STICK_LENGTH - 1; i++) {
                    colorsArray[i] = colorsArray[i + 1];
                }
                colorsArray[RGB_STICK_LENGTH - 1] = 0;
            }
        }


        // Show the new color.
        for (let i = 0; i < RGB_STICK_LENGTH; i++) {
            rgb_stick.setPixelColor(i, colorsArray[i]);
        }
        rgb_stick.show();
        basic.pause(0);
    }


    /**
     * Rotate the color of RGB Stick pixels(-7 to 7).
     * @param offset Number of pixels to rotate. eg: 1
     */
    //% weight=14
    //% blockGap=50
    //% blockId="rgb_stick_rotate_pixels"
    //% block="rotate RGB Stick pixels color by %offset"
    //% offset.min=-7 offset.max=7
    export function rotatePixels(offset: number): void {
        // Do nothing if offset is 0.
        if (offset == 0) {
            return;
        }

        // Rotate forward.
        else if (offset > 0) {
            while (offset-- > 0) {
                let lastLed = colorsArray[RGB_STICK_LENGTH - 1];
                for (let i = RGB_STICK_LENGTH - 1; i > 0; i--) {
                    colorsArray[i] = colorsArray[i - 1];
                }
                colorsArray[0] = lastLed;
            }
        }

        // Rotate backward.
        else {
            offset = -offset;
            while (offset-- > 0) {
                let lastLed = colorsArray[0];
                for (let i = 0; i < RGB_STICK_LENGTH - 1; i++) {
                    colorsArray[i] = colorsArray[i + 1];
                }
                colorsArray[RGB_STICK_LENGTH - 1] = lastLed;
            }
        }


        // Show the new color.
        for (let i = 0; i < RGB_STICK_LENGTH; i++) {
            rgb_stick.setPixelColor(i, colorsArray[i]);
        }
        rgb_stick.show();
        basic.pause(0);
    }


    /**
     * Return the RGB value of a known color.
    */
    //% weight=13
    //% blockGap=8
    //% blockId="edubit_colors"
    //% block="%color"
    export function colors(color: RgbColors): number {
        return <number>color;
    }


    /**
     * Converts red, green, blue channels into a RGB color.
     * @param red Value of the red channel (0 - 255). eg: 255
     * @param green Value of the green channel (0 - 255). eg: 255
     * @param blue Value of the blue channel (0 - 255). eg: 255
     */
    //% weight=12
    //% blockGap=30
    //% blockId="edubit_rgb_value"
    //% block="red %red green %green blue %blue"
    //% red.min=0 red.max=255
    //% green.min=0 green.max=255
    //% blue.min=0 blue.max=255
    export function rgb(red: number, green: number, blue: number): number {
        // Limit the value.
        red = limit(red, 0, 255);
        green = limit(green, 0, 255);
        blue = limit(blue, 0, 255);

        return ((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF);
    }


    /**
     * Limit the range of a number.
     * @param value The number we want to limit.
     * @param min Minimum value of the number.
     * @param max Maximum value of the number.
     */
    //% blockHidden=true
    //% blockId=edubit_limit
    function limit(value: number, min: number, max: number): number {
        if (value < min) {
            value = min;
        }
        else if (value > max) {
            value = max;
        }
        return value;
    }
}