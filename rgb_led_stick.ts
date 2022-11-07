/*******************************************************************************
 * Functions for RGB LED Stick.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// Default pin.
const RGB_STICK_PIN = DigitalPin.P13;

// Number of LEDs in RGB Bit.
const RGB_STICK_LENGTH = 8;


/**
 * Blocks for RGB LED Stick.
 */
//% weight=9 color=#ff8000 icon="\uf110" block="RGB LED Stick"
namespace rgb_led_stick {
    // Colors array for each pixel.
    let colorsArray: number[] = [];
    for (let i = 0; i < RGB_STICK_LENGTH; i++) {
        colorsArray.push(0);
    }

    // Create a Neo Pixel object for RGB LED Stick.
    let rgbStick = neopixel.create(RGB_STICK_PIN, RGB_STICK_LENGTH, NeoPixelMode.RGB);
    rgbStick.clear();

    // Reduce the default brightness.
    rgbStick.setBrightness(25);



    /**
     * Turn off all RGB pixels.
     */
    //% weight=20
    //% blockGap=8
    //% blockId="rgb_stick_clear_pixels"
    //% block="clear all RGB pixels"
    export function clear(): void {
        for (let i = 0; i < RGB_STICK_LENGTH; i++) {
            colorsArray[i] = 0;
        }

        rgbStick.clear();
        rgbStick.show();
        basic.pause(0);
    }


    /**
     * Set the brightness of the RGB pixels (0-255).
     * @param brightness Pixel brightness. eg: 25
     */
    //% weight=19
    //% blockGap=40
    //% blockId="rgb_stick_set_brightness"
    //% block="set RGB pixels brightness to %brightness"
    //% brightness.min=0 brightness.max=255
    export function setBrightness(brightness: number): void {
        rgbStick.setBrightness(brightness);

        // Restore the original color.
        for (let i = 0; i < RGB_STICK_LENGTH; i++) {
            rgbStick.setPixelColor(i, colorsArray[i]);
        }
        rgbStick.show();
        basic.pause(0);
    }


    /**
     * Show a rainbow pattern on all RGB pixels.
     */
    //% weight=18
    //% blockGap=8
    //% blockId="rgb_stick_show_rainbow"
    //% block="show rainbow on RGB pixels"
    export function showRainbow(): void {
        colorsArray[0] = RgbColors.Red;
        colorsArray[1] = RgbColors.Yellow;
        colorsArray[2] = RgbColors.Green;
        colorsArray[3] = RgbColors.Indigo;

        for (let i = 0; i < RGB_STICK_LENGTH; i++) {
            rgbStick.setPixelColor(i, colorsArray[i]);
        }

        rgbStick.show();
        basic.pause(0);
    }


    /**
     * Show the same color on all RGB pixels. 
     * @param color RGB color of the pixel.
     */
    //% weight=17
    //% blockGap=8
    //% blockId="rgb_stick_show_color"
    //% block="set all RGB pixels to %color"
    //% color.shadow="colorNumberPicker"
    export function showColor(color: number): void {
        for (let i = 0; i < RGB_STICK_LENGTH; i++) {
            colorsArray[i] = color;
        }
        rgbStick.showColor(color);
        basic.pause(0);
    }


    /**
     * Show color on individual RGB pixel.
     * @param pixel The pixel number we want to change the color.
     * @param color RGB color of the pixel.
     */
    //% weight=16
    //% blockGap=40
    //% blockId="rgb_stick_set_pixel_color"
    //% block="set RGB pixel %pixel to %color"
    //% color.shadow="colorNumberPicker"
    //% pixel.min=0 pixel.max=3
    export function setPixelColor(pixel: number, color: number): void {
        colorsArray[pixel] = color;
        rgbStick.setPixelColor(pixel, color);
        rgbStick.show();
        basic.pause(0);
    }


    /**
     * Shift the color of RGB pixels (-3 to 3).
     * @param offset Number of pixels to shift. eg: 1
     */
    //% weight=15
    //% blockGap=8
    //% blockId="rgb_stick_shift_pixels"
    //% block="shift RGB pixels color by %offset"
    //% offset.min=-3 offset.max=3
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
            rgbStick.setPixelColor(i, colorsArray[i]);
        }
        rgbStick.show();
        basic.pause(0);
    }


    /**
     * Rotate the color of RGB pixels(-3 to 3).
     * @param offset Number of pixels to rotate. eg: 1
     */
    //% weight=14
    //% blockGap=50
    //% blockId="rgb_stick_rotate_pixels"
    //% block="rotate RGB pixels color by %offset"
    //% offset.min=-3 offset.max=3
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
            rgbStick.setPixelColor(i, colorsArray[i]);
        }
        rgbStick.show();
        basic.pause(0);
    }


    /**
     * Return the RGB value of a known color.
    */
    //% weight=13
    //% blockGap=8
    //% blockId="rgb_stick_colors"
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
    //% blockId="rgb_stick_rgb_value"
    //% block="red %red green %green blue %blue"
    //% red.min=0 red.max=255
    //% green.min=0 green.max=255
    //% blue.min=0 blue.max=255
    export function rgb(red: number, green: number, blue: number): number {
        // Limit the value.
        red = rekabit.limit(red, 0, 255);
        green = rekabit.limit(green, 0, 255);
        blue = rekabit.limit(blue, 0, 255);

        return ((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF);
    }
}