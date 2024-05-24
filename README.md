# infinite-grid-proj

## Overview

This repository contains two examples, TestVertical and TestHorizontal, demonstrating how to use the InfiniteGrid component for creating efficient, scrollable lists in Cocos Creator. The InfiniteGrid component is included as a submodule in this project.

## Prerequisites

1. Ensure you have Cocos Creator >= 3.8.0 installed.

## Setup

1. Clone the repository:

```sh
git clone git@gitlab.hlouis.com:ccc-extensions/infinitegrid-ccc-proj.git
cd infinitegrid-ccc-proj

```

2. Initialize submodules:

```sh
git submodule update --init
```

## Examples

### TestVertical

The `TestVertical` example demonstrates how to use the `InfiniteGrid` component to create a vertically scrolling list.

The cell node is returned synchronously.

### TestHorizontal

The `TestHorizontal` example demonstrates how to use the `InfiniteGrid` component to create a horizontally scrolling list.

The cell node is returned asynchronously.

## Notes

1. Ensure that the anchor point of the cell node is set to the center v2(0.5, 0.5).

2. Adjust cell templates (cellA, cellB and cellC) as needed to fit your design requirements.


## Conclusion

The TestVertical and TestHorizontal examples provide a basic implementation of the InfiniteGrid component. Customize the data source and cell templates to fit your specific use case. For more advanced usage, refer to the [InfiniteGrid](https://github.com/hlouis/infinitegrid-ccc) documentation and API references.
