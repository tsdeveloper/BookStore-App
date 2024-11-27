/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LivroItemComponent } from './livro-item.component';

describe('LivroItemComponent', () => {
  let component: LivroItemComponent;
  let fixture: ComponentFixture<LivroItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivroItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivroItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
