// Test file for Cytron RBT Project Kit's MakeCode Extension
input.onButtonPressed(Button.A, function () {
    rekabit.setServoPosition(ServoChannel.All, 20)
    rekabit.runMotor(MotorChannel.All, MotorDirection.Forward, 128)
    bigLED.setBigLed(RekabitPortYellowPin.P13, bigLED.digitalStatePicker(DigitalIoState.On))
    bigLED.setBigLed(RekabitPortYellowPin.P15, bigLED.digitalStatePicker(DigitalIoState.On))
})
input.onButtonPressed(Button.AB, function () {
    rekabit.brakeMotor(MotorChannel.All)
    rekabit.disableServo(ServoChannel.All)
})
input.onButtonPressed(Button.B, function () {
    rekabit.setServoPosition(ServoChannel.All, 160)
    rekabit.runMotor(MotorChannel.All, MotorDirection.Backward, 128)
    bigLED.setBigLed(RekabitPortYellowPin.P13, bigLED.digitalStatePicker(DigitalIoState.Off))
    bigLED.setBigLed(RekabitPortYellowPin.P15, bigLED.digitalStatePicker(DigitalIoState.Off))
})
rgbStick.create(RekabitPortYellowPin.P0)
ultrasonic.setUltrasonicTrigEcho(RekabitUltrasonicIOPins.set2)
basic.forever(function () {
    if (soilMoisture.compareAnalog(RekabitAnalogInPin.P1, AnalogCompareType.MoreThan, 512)) {
        basic.showIcon(IconNames.Happy)
    } else {
        basic.showIcon(IconNames.Sad)
    }
    if (ultrasonic.compareDistance(AnalogCompareType.LessThan, 20)) {
        rgbStick.showColor(rgbStick.colors(RgbColors.Red))
    } else {
        rgbStick.showRainbow()
    }
})