import 'react-test-renderer';
import { renderHook, act } from '@testing-library/react-hooks';
import { useStateNode } from "./UseStateNode";

describe('useStateNode', () => {
  let mockStateNode;
  let unsubscribeMock;
  let triggerUpdate;
  
  beforeEach(() => {
    unsubscribeMock = jest.fn();
    triggerUpdate = undefined;
    mockStateNode = {
      get: jest.fn().mockReturnValue('initial'),
      subscribe: jest.fn().mockImplementation((callback) => {
        triggerUpdate = () => callback('updated');
        return unsubscribeMock;
      })
    };
  });
  
  it('sets initial state from stateNode.get', () => {
    const { result } = renderHook(() => useStateNode(mockStateNode));
    expect(mockStateNode.get).toHaveBeenCalled();
    expect(result.current.value).toBe('initial');
  });
  
  it('subscribes to stateNode on mount', () => {
    renderHook(() => useStateNode(mockStateNode));
    expect(mockStateNode.subscribe).toHaveBeenCalledWith(expect.any(Function));
  });
  
  it('updates state when stateNode triggers subscription callback', () => {
    const { result } = renderHook(() => useStateNode(mockStateNode));
    act(() => {
      triggerUpdate();
    });
    expect(result.current.value).toBe('updated');
  });
  
  it('cleans up subscription on unmount', () => {
    const { unmount } = renderHook(() => useStateNode(mockStateNode));
    unmount();
    expect(unsubscribeMock).toHaveBeenCalled();
  });
  
  it('blocks access to "get" and "subscribe" through the proxy', () => {
    const { result } = renderHook(() => useStateNode(mockStateNode));
    expect(result.current.get).toBeUndefined();
    expect(result.current.subscribe).toBeUndefined();
  });
  
  it('allows access to other properties/methods through the proxy', () => {
    mockStateNode.someMethod = jest.fn().mockReturnValue('something');
    const { result } = renderHook(() => useStateNode(mockStateNode));
    expect(result.current.someMethod()).toBe('something');
  });
  
  it('returns undefined when a symbol is accessed', () => {
    const { result } = renderHook(() => useStateNode(mockStateNode));
    const symbol = Symbol('custom-symbol');
    expect(result.current[symbol]).not.toBeDefined();
  });
});
