import * as fromProfesorState from './profesor-state.reducer';
import { selectProfesorStateState } from './profesor-state.selectors';

describe('ProfesorState Selectors', () => {
  it('should select the feature state', () => {
    const result = selectProfesorStateState({
      [fromProfesorState.profesorStateFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
