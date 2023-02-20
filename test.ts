// Test file for Cytron RBT Project Kit's MakeCode Extension
input.onButtonPressed(Button.A, function () {
    rekabit.setServoPosition(ServoChannel.All, 20)
    rekabit.runMotor(MotorChannel.All, MotorDirection.Forward, 128)
    rekabitBigLED.setBigLed(RekabitPortYellowPin.P13, rekabitBigLED.digitalStatePicker(RekabitDigitalIoState.On))
    rekabitBigLED.setBigLed(RekabitPortYellowPin.P15, rekabitBigLED.digitalStatePicker(RekabitDigitalIoState.On))
})
input.onButtonPressed(Button.AB, function () {
    rekabit.brakeMotor(MotorChannel.All)
    rekabit.disableServo(ServoChannel.All)
})
input.onButtonPressed(Button.B, function () {
    rekabit.setServoPosition(ServoChannel.All, 160)
    rekabit.runMotor(MotorChannel.All, MotorDirection.Backward, 128)
    rekabitBigLED.setBigLed(RekabitPortYellowPin.P13, rekabitBigLED.digitalStatePicker(RekabitDigitalIoState.Off))
    rekabitBigLED.setBigLed(RekabitPortYellowPin.P15, rekabitBigLED.digitalStatePicker(RekabitDigitalIoState.Off))
})
rekabitRgbStick.create(RekabitPortYellowPin.P0)
rekabitUltrasonic.setUltrasonicTrigEcho(RekabitUltrasonicIOPins.p2_p12)
basic.forever(function () {
    if (rekabitSoilMoisture.compareAnalog(RekabitAnalogInPin.P1, RekabitAnalogCompareType.MoreThan, 512)) {
        basic.showIcon(IconNames.Happy)
    } else {
        basic.showIcon(IconNames.Sad)
    }
    if (rekabitUltrasonic.compareDistance(RekabitAnalogCompareType.LessThan, 20)) {
        rekabitRgbStick.showColor(rekabitRgbStick.colors(RgbColors.Red))
    } else {
        rekabitRgbStick.showRainbow()
    }
})