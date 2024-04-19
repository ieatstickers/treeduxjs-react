# TreeduxJS React

TreeduxJS React is a set of React hooks that allow you to easily connect your React components to your Treedux data store.

## Installation

This package is designed to be used in conjunction with the main TreeduxJS package. If you haven't already installed TreeduxJS, you can do so using the following command:

```bash
npm install treeduxjs
```

You will also notice that TreeduxJS has a peer dependency of `@react/toolkit` which you will need to install as well (if you haven't already):

```bash
npm install @reduxjs/toolkit
```

Once you have installed TreeduxJS and its peer dependencies, you can install TreeduxJS React using the following command:

```bash
npm install treeduxjs-react
```

## Example Usage

See the README.md in the TreeduxJS package for instructions on how to set up your Treedux instance. Once you have your Treedux instance set up, you can start using TreeduxJS React:

```tsx
import { useStateNode } from "treeduxjs-react";

function MyComponent()
{
  const { value: user, set: setUser } = useStateNode(treedux.state.user.user);
  
  return (
    <div>
      <h1>Name: {user.name}</h1>
      <h1>Age: {user.age}</h1>
      <button onClick={() => setUser({ name: "John McClane", age: 32 })}>Change Name</button>
    </div>
  );

}
```
