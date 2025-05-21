import { StateNodeInterface } from "treeduxjs";
import { StateNodeHooks } from "../Type/StateNodeHooks";
import { useState, useEffect, useMemo } from "react";

export function useStateNode<StateNode extends StateNodeInterface<any, any>>(stateNode: StateNode): StateNodeHooks<StateNode>
{
  const [ value, setValue ] = useState(stateNode.get());
  useEffect(() => stateNode.subscribe(setValue), [ stateNode ]);
  
  return useMemo(() => {
    return new Proxy(
      stateNode,
      {
        get: (self, property: string | symbol) => {
          if (typeof property !== "string") return undefined;
          
          if (property === "value") return value;
          if ([ "get", "subscribe" ].includes(property)) return undefined;
          return self[property];
        }
      }
    ) as unknown as StateNodeHooks<StateNode>;
  }, [ stateNode, value ]);
}
