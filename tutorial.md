# Control a Micro:bit Vehicle via Radio and Accelerometer

## Introduction @unplugged

In this tutorial, you will learn how to control a vehicle with the Micro:bit. We will use a motor and a motor shield (motor driver). The motor driver is the red board that is attached to the vehicle. The motor is connected to the motor driver, and the motor driver is connected to the Micro:bit. Everything is already assembled on the vehicle. When it's time, you just need to insert the Micro:bit into the slot.

## Determining the Direction

We have already created a variable **r** and a function **determineDirection** for you. The function **determineDirection** determines the orientation (rotation) of the Micro:bit using the accelerometer. The variable **r** will be used later to control the direction of the vehicle. So there's nothing to do here yet!

```template
let r = 0

function determineDirection() {
    // If turned too far, it would otherwise set exactly the opposite direction
    if (input.acceleration(Dimension.Y) > 0) {
        r = 180 * (Math.atan2(input.acceleration(Dimension.Y), -1 * input.acceleration(Dimension.X)) / Math.PI) - 90
    }
}
```

## At Startup

Create the variables **vl** and **vr**.

The variable **r** already exists; it is used for the direction. **vl** and **vr** are used for the speed of the left and right motors.

At startup ``||basic:on start||``, the **SmallDiamond** icon is displayed, and the motors' speed and direction are set to 703 and 0, respectively.

Moreover, you need to set the radio group. It's best to use the same number as in the previous tutorial.

```blocks
let r = 0
let vl = 0
let vr = 0
basic.showIcon(IconNames.SmallDiamond)
vr = 703
vl = 703
radio.setGroup(134)
```

## When Pressing the A, B, and Logo Buttons

When the A button is pressed, we send the text "forward" via radio. When the B button is pressed, we send the text "back" via radio. When the logo is pressed, we send the text "stop" via radio.

Moreover, we use arrows to indicate the direction and the **SmallDiamond** icon to show that the vehicle has been stopped.

```block
input.onButtonPressed(Button.A, function () {
    basic.showArrow(ArrowNames.North)
    radio.sendString("forward")
})
input.onButtonPressed(Button.B, function () {
    basic.showArrow(ArrowNames.South)
    radio.sendString("back")
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showIcon(IconNames.SmallDiamond)
    radio.sendString("stop")
})
```

## The Functions Forward, Back, and Stop

To create a function, click on Advanced and then on **Create a function**.

The pins 0, 1, 8, 12 of the Micro:bit are connected to the inputs of the motor driver that control the motors' direction.

To tell the motor driver in which direction the motors should run, the pins need to be set to 1 or 0.

You will have to figure out later on your own how the pins' values must be set to be able to drive backwards.

```block
function forward() {
    pins.digitalWritePin(DigitalPin.P0, 1)
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P8, 0)
    pins.digitalWritePin(DigitalPin.P12, 1)
    basic.showArrow(ArrowNames.North)
}
function stop() {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P12, 1)
    basic.showIcon(IconNames.SmallDiamond)
}
function back() {
    basic.showArrow(ArrowNames.South)
}
```

## Writing the Motors' Speed

The outputs of the motor driver that control the motors' speed are connected to pin 14 and 13 of the Micro:bit.

```block
function writeSpeed() {
    pins.analogWritePin(AnalogPin.P14, vr)
    pins.analogWritePin(AnalogPin.P13, vl)
}
```

## Determine What We Do When We Receive Text

``||functions:call forward||`` can be found under **Advanced - Functions**.
Etc.

```block
radio.onReceivedString(function (receivedString) {
    if (receivedString == "forward") {
        forward()
    } else if

(receivedString == "back") {
        back()
    } else if (receivedString == "stop") {
        stop()
    }
})
// @hide
function forward() {
    pins.digitalWritePin(DigitalPin.P0, 1)
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P8, 0)
    pins.digitalWritePin(DigitalPin.P12, 1)
    basic.showArrow(ArrowNames.North)
}
// @hide
function stop() {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P12, 1)
    basic.showIcon(IconNames.SmallDiamond)
}
// @hide
function back() {
    basic.showArrow(ArrowNames.South)
}
```

## Continuously Write and Send Potentially Changed Values

Since the values of vl and vr will constantly change later on, we write them continuously. (``||functions:determineDirection||``)

Moreover, we send the direction **r** via radio.

```block
basic.forever(function () {
    radio.sendNumber(r)
    writeSpeed()
})
// @hide
function writeSpeed() {
    pins.analogWritePin(AnalogPin.P14, vr)
    pins.analogWritePin(AnalogPin.P13, vl)
}
```

## Testing!!! @unplugged

Your vehicle should now be able to move forward and stop.
Get a vehicle, find a partner, set the radio group, and try it out.
One micro:bit is inserted in the vehicle, and the other controls it.

## Determining the Direction

The direction is determined using the accelerometer. This is done using the **determineDirection** function. This function has been there from the start, so you don't need to create it anew.

But you have to **continuously** complement it with **determineDirection**. (Do not create a new forever block!)

```block
function determineDirection() {
    // If turned too far, it would otherwise set exactly the opposite direction
    if (input.acceleration(Dimension.Y) > 0) {
        r = 180 * (Math.atan2(input.acceleration(Dimension.Y), -1 * input.acceleration(Dimension.X)) / Math.PI) - 90
    }
}
basic.forever(function () {
// @highlight
    determineDirection()
    radio.sendNumber(r)
    writeSpeed()
})
// @hide
function writeSpeed() {
    pins.analogWritePin(AnalogPin.P14, vr)
    pins.analogWritePin(AnalogPin.P13, vl)
}
```

## Convert the Received Number into Speed

The received number is converted into speed and written into the variables **vl** and **vr**.

```block
radio.onReceivedNumber(function (receivedNumber) {
    // serial.writeValue("r", receivedNumber)
    vr = Math.map(receivedNumber, -90, 90, 383, 1023)
    vl = Math.map(-1 * receivedNumber, -90, 90, 383, 1023)
})
```

## Final Project

The final project will look like this:

```blocks
let r = 0
let vl = 0
let vr = 0
basic.showIcon(IconNames.SmallDiamond)
vr = 703
vl = 703
radio.setGroup(134)
stop()
// @hide
function stop() {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P12, 1)
    basic.showIcon(IconNames.SmallDiamond)
}
```

```block
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showIcon(IconNames.SmallDiamond)
    radio.sendString("stop")
})
radio.onReceivedNumber(function (receivedNumber) {
    vr = Math.map(receivedNumber, -90, 90, 383, 1023)
    vl = Math.map(-1 * receivedNumber, -90, 90, 383, 1023)
})
function forward() {
    pins.digitalWritePin(DigitalPin.P0, 1)
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P8, 0)
    pins.digitalWritePin(DigitalPin.P12, 1)
    basic.showArrow(ArrowNames.North)
}
function stop() {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(D

    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P12, 1)
    basic.showIcon(IconNames.SmallDiamond)
}
input.onButtonPressed(Button.A, function () {
    basic.showArrow(ArrowNames.North)
    radio.sendString("forward")
})
function back() {
    basic.showArrow(ArrowNames.South)
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "forward") {
        forward()
    } else if (receivedString == "back") {
        back()
    } else if (receivedString == "stop") {
        stop()
    }
})
input.onButtonPressed(Button.B, function () {
    basic.showArrow(ArrowNames.South)
    radio.sendString("back")
})
function determineDirection() {
    // If turned too far, it would otherwise set exactly the opposite direction
    if (input.acceleration(Dimension.Y) > 0) {
        r = 180 * (Math.atan2(input.acceleration(Dimension.Y), -1 * input.acceleration(Dimension.X)) / Math.PI) - 90
    }
}
function writeSpeed() {
    pins.analogWritePin(AnalogPin.P14, vr)
    pins.analogWritePin(AnalogPin.P13, vl)
}
basic.forever(function () {
    determineDirection()
    radio.sendNumber(r)
    writeSpeed()
})
let r = 0
let vl = 0
let vr = 0
// @hide
basic.showIcon(IconNames.SmallDiamond)
// @hide
vr = 703
// @hide
vl = 703
// @hide
radio.setGroup(134)
// @hide
stop()
```

## Testing and Submission

Show a teacher that your vehicle works and submit your code.

```validation.global
# BlocksExistValidator
    * enabled: true
```
