import { StateNodeInterface } from "treeduxjs/dist/src/Type/StateNodeInterface";

export type StateNodeHooks<StateNode extends StateNodeInterface<any>> = {
  [P in keyof Omit<StateNode, 'get' | 'subscribe'>]: StateNode[P]
} & (StateNode extends { get: (...args: any[]) => any } ? { value: ReturnType<StateNode['get']> } : {});
