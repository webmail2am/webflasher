# Web Flasher

A portable, browser-based firmware flasher for **ESP32 / ESP8266** and **Arduino (AVR)** boards.
One HTML file — no installation. Works in **Chrome** or **Edge** (desktop) using the Web Serial API.

## Use it

- Download [`WebFlasher.html`](WebFlasher.html) and open it in Chrome/Edge, or
- open the hosted version (GitHub Pages) at `https://<user>.github.io/<repo>/WebFlasher.html`.

Click **Select port**, pick the tab for your board, and go.

## Features

### ESP32 / ESP8266 (S2, S3, C3, C6, H2, C2, C5, P4)
- Chip info: type, revision, features, crystal, MAC, flash ID and size
- Flash several `.bin` / `.hex` files at chosen addresses
  - presets: merged image @ 0x0, Arduino/PlatformIO 4-file set, app only, filesystem image
  - drag & drop with address guessing from file names
- Filesystem images (LittleFS / SPIFFS / FATFS) — address taken from the partition table
- Options: baud, flash mode / frequency / size, erase all first, compression, MD5 verify, reset after
- Erase entire flash or any region; erase or back up single partitions
- Read the partition table from the board
- Read / back up flash (whole chip or range) to `.bin`

### Arduino (AVR)
- Uno, Nano (new/old bootloader), Pro Mini, ATmega168, Mega 2560, Leonardo / Micro / Pro Micro, or custom settings
- Protocols: STK500v1 (Optiboot, ATmegaBOOT), STK500v2 (Mega 2560), AVR109 (Caterina)
- Test connection (bootloader version + chip signature)
- Upload program (`.hex` / `.bin`) with verify, upload EEPROM (`.eep`)
- Erase program area or a region; clear EEPROM via bootloader or with a built-in helper program
- Back up program memory and EEPROM to `.hex` / `.bin`

### Serial monitor
- Any baud rate, line endings, timestamps, hex view, send text, save log
- ESP reset / download-mode and Arduino reset buttons

## Limitations
- Chrome / Edge only (Firefox and Safari have no Web Serial).
- USB-serial drivers (CH340, CP210x) must be installed on the PC if Windows doesn't add them automatically.
- AVR fuses and burning a bootloader need an ISP programmer — not supported over USB.
- The stock Uno bootloader cannot write EEPROM; use the helper program instead.

## Building

`WebFlasher.html` is generated from `src/app.html` with the esptool-js bundle inlined:

```
node build.js
```

## Credits
ESP flashing uses [esptool-js](https://github.com/espressif/esptool-js) 0.6.1 by Espressif (Apache-2.0, see `src/esptool-js-LICENSE.txt`).
