import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export type initialStateType = {
  +counter: object,
  +home: object,
};

export type Action = {
  +type: string
};

export type Array = {
  +type: array
};

export type DangerObject = {
  +type: object
};

export type GetState = () => initialStateType;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
