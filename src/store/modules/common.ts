import { createModel } from '@rematch/core';
import type { RootModel } from '.';

export const common = createModel<RootModel>()({
  state: {
    count: 0,
  } as { count: number },
  reducers: {
    add(prevState, payload: number) {
      prevState.count += payload;
      return prevState;
    },
  },
  effects: (dispatch) => ({}),
});
