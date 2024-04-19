import { StateNodeInterface } from "treeduxjs/dist/src/Type/StateNodeInterface";
import { StateNodeHooks } from "../Type/StateNodeHooks";
export declare function useStateNode<StateNode extends StateNodeInterface<any>>(stateNode: StateNode): StateNodeHooks<StateNode>;
