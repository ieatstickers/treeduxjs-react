import { StateNodeInterface } from "treeduxjs";
import { StateNodeHooks } from "../Type/StateNodeHooks";
export declare function useStateNode<StateNode extends StateNodeInterface<any, any>>(stateNode: StateNode): StateNodeHooks<StateNode>;
