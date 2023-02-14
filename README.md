# REKA:BIT RBT Project Kit Extension for Microsoft MakeCode

This code provides the MakeCode blocks for [**REKA:BIT RBT Project Kit**](https://www.cytron.io/p-reka-bit-rbt-project-kit) with the aim to lower the learning curve for beginners who wants to build STEAM (and RBT) projects with micro:bit.

![REKA:BIT RBT Project Kit](https://github.com/CytronTechnologies/pxt-rekabit-rbt-project-kit/blob/master/image.png)

This project kit utilizes [**REKA:BIT**](https://www.cytron.io/p-rekabit-simplifying-robotics-w-microbit) which expands the capabilities of the feature-packed **micro:bit** in robotics :robot: applications. With the built-in 2-channel DC motor driver, 4x servo control and external power input DC jack, anyone can build projects with mechanical movements right away. The Grove ports enable additional sensors and modules to be connected conveniently. The LED status indicators on its IO pins provides hassleless code & wiring troubleshooting. REKA:BIT works with **micro:bit V1 & V2**.


## Adding the Extension in MakeCode Editor
* Open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* Click on **New Project** and give your project a meaningful name
* Click on **Extensions** under the gearwheel :gear: menu
* Search for "**rekabit rbt project**" or "https://github.com/cytrontechnologies/pxt-rekabit-rbt-project-kit"
* Click on the 'rekabit rbt project kit' card to install the extension


## Examples
### REKA:BIT DC Motors

Run Motor 1 forward at 50% speed when button A is pressed, brake the motor when button B is pressed.

```blocks
input.onButtonPressed(Button.A, function () {
    rekabit.runMotor(MotorChannel.M1, MotorDirection.Forward, 127)
})
input.onButtonPressed(Button.B, function () {
    rekabit.brakeMotor(MotorChannel.M1)
})
```

### REKA:BIT Servos

Button A pressed - Rotate Servo 1 to 0 degree.
Button B pressed - Rotate Servo 1 to 180 degree.
Button A+B pressed - Disable Servo 1. No pulse is sent to Servo 1 and it can be rotated by hand.

```blocks
input.onButtonPressed(Button.A, function () {
    rekabit.setServoPosition(ServoChannel.S1, 0)
})
input.onButtonPressed(Button.B, function () {
    rekabit.setServoPosition(ServoChannel.S1, 180)
})
input.onButtonPressed(Button.AB, function () {
    rekabit.disableServo(ServoChannel.S1)
})
```

### RGB Stick

Create an RGB Stick object and assign it to micro:bit pin P0.
This block must be added at the beginning of each project that uses RGB Stick.

```blocks
rgbStick.create(RekabitPortYellowPin.P0)
```

Turn off the RGB Stick.

```blocks
rgbStick.create(RekabitPortYellowPin.P0)
rgbStick.turnoff()
```

Change the RGB Stick brightness to maximum.

```blocks
rgbStick.create(RekabitPortYellowPin.P0)
rgbStick.setBrightness(255)
```

Show RGB Stick to green color on all the pixels and change the color one by one to red.

```blocks
rgbStick.create(RekabitPortYellowPin.P0)
rgbStick.showColor(0x00ff00)
basic.pause(1000)
for (let index = 0; index <= 7; index++) {
    rgbStick.setPixelColor(index, 0xff0000)
    basic.pause(500)
}
```








## License
MIT

## Supported targets  
* for PXT/microbit



> Open this page at [https://cytrontechnologies.github.io/pxt-rekabit-rbt-project-kit/](https://cytrontechnologies.github.io/pxt-rekabit-rbt-project-kit/)


<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
