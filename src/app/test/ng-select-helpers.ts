import { DebugElement } from '@angular/core';
import { ComponentFixture, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export enum KeyCode {
  Tab = 9,
  Enter = 13,
  Esc = 27,
  Space = 32,
  ArrowUp = 38,
  ArrowDown = 40,
  Backspace = 8
}

export class TestsErrorHandler {}

export function tickAndDetectChanges(fixture: ComponentFixture<any>) {
    fixture.detectChanges();
    tick();
}

export function selectOption(fixture, id: string, index: number) {
    triggerKeyDownEvent(getNgSelectElement(fixture, id), KeyCode.Space);
    tickAndDetectChanges(fixture);
    for (let i = 0; i < index; i++) {
        triggerKeyDownEvent(getNgSelectElement(fixture, id), KeyCode.ArrowDown);
    }
    triggerKeyDownEvent(getNgSelectElement(fixture, id), KeyCode.Enter);
}

export function getNgSelectElement(fixture: ComponentFixture<any>, id: string): DebugElement {
    return fixture.debugElement.query(By.css('#' + id));
}

export function triggerKeyDownEvent(element: DebugElement, which: number, key = '', target: Element = null): void {
    element.triggerEventHandler('keydown', {
        which,
        key,
        preventDefault: () => { },
        target,
    });
}
