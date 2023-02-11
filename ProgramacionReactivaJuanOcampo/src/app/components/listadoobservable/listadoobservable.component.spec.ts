import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoobservableComponent } from './listadoobservable.component';

describe('ListadoobservableComponent', () => {
  let component: ListadoobservableComponent;
  let fixture: ComponentFixture<ListadoobservableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoobservableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoobservableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
