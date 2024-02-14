---
lang: de
---
# Micro:bit Fahrzeug über Funk und Beschleunigungssensor steuern

[TOC]

## Einleitung

In diesem Tutorial lernst du, wie du ein Fahrzeug mit dem Micro:bit steuern kannst. Dazu verwenden wir einen Motor und ein Motorshield (Motortreiber). Das Motortreiber ist die rote Platine, die auf dem Fahrzeug steckt. Der Motor wird mit dem Motortreiber verbunden und der Motortreiber wird mit dem Micro:bit verbunden. Das ist alles schon fertig auf dem Fahrzeug. Du musst, wenn es so weit ist nur noch den Micro:bit in den Steckplatz stecken.

## Beim Starten

Erstelle die Variablen **r**, **vl** und **vr**. 

**r** wird für die Richtung verwendet und **vl** und **vr** für die Geschwindigkeit der linken und rechten Motoren.

Beim Starten wird das Symbol **SmallDiamond** angezeigt und die Geschwindigkeit der Motoren auf 703 und die Richtung auf 0 gesetzt.

Außerdem musst du die Funkgruppe auf einstellen.

```blocks
let r = 0
let vl = 0
let vr = 0
basic.showIcon(IconNames.SmallDiamond)
vr = 703
vl = 703
radio.setGroup(134)
```

## Beim drücken der Knöpfe A, B und des Logos

Wenn der Knopf A gedrückt wird, senden wir den Text "vor" über Funk. Wenn der Knopf B gedrückt wird, senden wir den Text "zurück" über Funk. Wenn das Logo gedrückt wird, senden wir den Text "stop" über Funk.

Außerdem verwenden wir Pfleile, um die Richtung anzuzeigen und das Icon **SmallDiamond** um anzuzeigen, dass das Fahrzeug gestoppt wurde.

```blocks
input.onButtonPressed(Button.A, function () {
    basic.showArrow(ArrowNames.North)
    radio.sendString("vor")
})
input.onButtonPressed(Button.B, function () {
    basic.showArrow(ArrowNames.South)
    radio.sendString("zurück")
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showIcon(IconNames.SmallDiamond)
    radio.sendString("stop")
})
```

## Die Funktionen vor, zurück und stop

Um eine Funktion zu erstellen, klicke unter Fortgeschritten auf Funktionen und dann auf **Erstelle eine Funktion**.



Die Pins 0, 1, 8, 12 des Micro:bit sind mit den Eingängen des Motortreibers, die die Richtung der Motoren steuern, verbunden.

Um dem Motortreiber mitzuteilen, in welche Richtung die Motoren laufen sollen, müssen die Pins auf 1 oder 0 gesetzt werden.

```blocks
function vor () {
    pins.digitalWritePin(DigitalPin.P0, 1)
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P8, 0)
    pins.digitalWritePin(DigitalPin.P12, 1)
    basic.showArrow(ArrowNames.North)
}
function stop () {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P12, 1)
    basic.showIcon(IconNames.SmallDiamond)
}
function zurück () {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 1)
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P12, 0)
    basic.showArrow(ArrowNames.South)
}
```

## Die Geschwindigkeit der Motoren schreiben

```blocks
function schreibeGeschwindigkeit () {
    pins.analogWritePin(AnalogPin.P14, vr)
    pins.analogWritePin(AnalogPin.P13, vl)
}
```

## Fortlaufend die möglicherweise geänderten Werte schreiben und senden

```blocks
basic.forever(function () {
    radio.sendNumber(r)
    schreibeGeschwindigkeit()
})
```

## Testen!!!

Dein Fahrzeug sollte nun in der Lage sein vorwärts und rückwärts zu fahren und zu stoppen.
Hole dir ein Fahrzeug, suche dir einen Partner, stellt die Funkgruppe ein und probiert es aus.
Ein micro:bit steckt im Fahrzeug und der andere steuert es.

## Richtung bestimmen

Die Richtung wird mit dem Beschleunigungssensor bestimmt. Dazu wird die Funktion **bestimmeRichtung** verwendet.

```blocks
function bestimmeRichtung () {
    // Wenn zu weit gedreht, wird sonst genau die entgegengesetzte Richtung gesetzt
    if (input.acceleration(Dimension.Y) > 0) {
        r = 180 * (Math.atan2(input.acceleration(Dimension.Y), -1 * input.acceleration(Dimension.X)) / Math.PI) - 90
    }
}
basic.forever(function () {
// @highlight
    bestimmeRichtung()
    radio.sendNumber(r)
    schreibeGeschwindigkeit()
})
```

## Die empfangene Zahl in die Geschwindigkeit umrechnen

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    // serial.writeValue("r", receivedNumber)
    vr = Math.map(receivedNumber, -90, 90, 383, 1023)
    vl = Math.map(-1 * receivedNumber, -90, 90, 383, 1023)
})
```


## Fertiges Projekt

```blocks
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showIcon(IconNames.SmallDiamond)
    radio.sendString("stop")
})
radio.onReceivedNumber(function (receivedNumber) {
    // serial.writeValue("r", receivedNumber)
    vr = Math.map(receivedNumber, -90, 90, 383, 1023)
    vl = Math.map(-1 * receivedNumber, -90, 90, 383, 1023)
})
function vor () {
    pins.digitalWritePin(DigitalPin.P0, 1)
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P8, 0)
    pins.digitalWritePin(DigitalPin.P12, 1)
    basic.showArrow(ArrowNames.North)
}
function stop () {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P12, 1)
    basic.showIcon(IconNames.SmallDiamond)
}
input.onButtonPressed(Button.A, function () {
    basic.showArrow(ArrowNames.North)
    radio.sendString("vor")
})
function zurück () {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 1)
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P12, 0)
    basic.showArrow(ArrowNames.South)
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "vor") {
        vor()
    } else if (receivedString == "zurück") {
        zurück()
    } else if (receivedString == "stop") {
        stop()
    }
})
input.onButtonPressed(Button.B, function () {
    basic.showArrow(ArrowNames.South)
    radio.sendString("zurück")
})
function bestimmeRichtung () {
    // Wenn zu weit gedreht, wird sonst genau die entgegengesetzte Richtung gesetzt
    if (input.acceleration(Dimension.Y) > 0) {
        r = 180 * (Math.atan2(input.acceleration(Dimension.Y), -1 * input.acceleration(Dimension.X)) / Math.PI) - 90
    }
}
function schreibeGeschwindigkeit () {
    pins.analogWritePin(AnalogPin.P14, vr)
    pins.analogWritePin(AnalogPin.P13, vl)
}
let r = 0
let vl = 0
let vr = 0
basic.showIcon(IconNames.SmallDiamond)
vr = 703
vl = 703
radio.setGroup(134)
stop()
basic.forever(function () {
    bestimmeRichtung()
    radio.sendNumber(r)
    schreibeGeschwindigkeit()
})

```

## Testen und abgeben

Zeigt einem Lehrer, dass euer Fahrzeug funktioniert und gebt euren Code ab.

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
