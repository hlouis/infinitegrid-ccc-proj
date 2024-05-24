import { _decorator } from "cc";
import { InfiniteGrid } from "./infinite-grid/InfiniteGrid";
const { ccclass } = _decorator;

/**
 * @en The InfiniteGrid in the example project is a submdule. If you bind the InfiniteGrid component directly on the scene/prefab, it will cause the preview in the editor to fail. So here, create a new InfiniteGridExt class that inherits from InfiniteGrid, which is used to preview normally in the editor.
 *
 * @zh 该例子项目里的infinite-grid是作为submdule存在的。如果直接在scene/prefab上绑定InfiniteGrid组件，会导致无法在编辑器里正常预览。所以这里新建一个InfiniteGridExt继承InfiniteGrid，用于在编辑器里正常预览。
 */
@ccclass('InfiniteGridExt')
export class InfiniteGridExt extends InfiniteGrid {

}