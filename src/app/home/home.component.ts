import { Component, OnInit } from '@angular/core';
import Keyboard from "simple-keyboard";
import { ElectronService } from '../core/services';
import layout from "simple-keyboard-layouts/build/layouts/spanish";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  keyboard: Keyboard;
  currentModifier: Array<string>;

  constructor(
    private electronService: ElectronService
  ) { }

  ngOnInit(): void {
    this.currentModifier = [];
    this.init();
  }

  private init(): void {
    this.keyboard = new Keyboard({
      onChange: input => { },
      onKeyPress: button => {
        this.keyPress(button);
      },
      physicalKeyboardHighlight: true,
      syncInstanceInputs: true,
      layout: layout
    });
  }

  private keyPress(button: string): void {
    switch (button) {
      case "{shift}":
        this.handleShift();
        break;

      case "{lock}":
        this.handleShift();
        break;

      case "{bksp}":
        this.keyTap('backspace');
        break;

      case "{enter}":
        this.keyTap('enter');
        break;

      case "{space}":
        this.keyTap('space');
        break;


      default:
        this.keyTap(button);
        break;
    }
  }

  private handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle;

    if (currentLayout === "default") {
      this.currentModifier.push("shift");
      shiftToggle = "shift";
    } else {
      this.currentModifier.push("default");
      shiftToggle = "default";
    }

    console.log(shiftToggle);
    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };

  private typeString(keyCode: string) {
    console.log(keyCode);
    this.electronService.robot.keyTap(keyCode, this.currentModifier);
  }

  private keyTap(keyCode: string) {
    this.electronService.robot.keyTap(keyCode, this.currentModifier);
  }
}
