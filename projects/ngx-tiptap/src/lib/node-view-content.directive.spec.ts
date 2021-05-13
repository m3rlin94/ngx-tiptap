import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NodeViewContentDirective } from './node-view-content.directive';

@Component({
  template: `<div tiptapNodeViewContent>Hello Tiptap!</div>`
})

class TestComponent { }

describe('NodeViewContentDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        NodeViewContentDirective,
      ]
    });

    await TestBed.compileComponents()

    fixture = TestBed.createComponent(TestComponent)
    component = fixture.componentInstance;

    fixture.detectChanges()
  });

  it('should add the attributes correctly', () => {
    expect(fixture.debugElement.query(By.css('[data-node-view-content]'))).toBeTruthy()
  });
});