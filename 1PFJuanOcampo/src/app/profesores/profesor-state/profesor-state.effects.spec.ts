import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ProfesorStateEffects } from './state/profesor-state.effects';

describe('ProfesorStateEffects', () => {
  let actions$: Observable<any>;
  let effects: ProfesorStateEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfesorStateEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ProfesorStateEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
