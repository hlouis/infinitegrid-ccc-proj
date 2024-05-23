import { Button, Component, EditBox, Node, Size, _decorator, instantiate, size } from "cc";
import { IFDataSource, InfiniteGrid } from "./infinite-grid/InfiniteGrid";
import { InfiniteCell } from "./infinite-grid/InfiniteCell";
const { ccclass, property } = _decorator;

/**
 * @en Test class for vertical scrolling InfiniteGrid
 * @zh 用于测试垂直滚动的 InfiniteGrid 的类
 */
@ccclass('TestVertical')
export class TestVertical extends Component {

    /**
     * @en The root node containing the grid
     * @zh 包含网格的根节点
     */
    @property(Node)
    public root: Node;

    /**
     * @en Prefab for cell type A
     * @zh A 类型单元格的
     */
    @property(Node)
    public cellA: Node;

    /**
     * @en Prefab for cell type B
     * @zh B 类型单元格的
     */
    @property(Node)
    public cellB: Node;

    /**
     * @en Prefab for cell type B
     * @zh C 类型单元格的
     */
    @property(Node)
    public cellC: Node;

    /**
     * @en Input box for cell tag
     * @zh 标签输入框
     */
    @property(EditBox)
    public editboxInputTag: EditBox;

    /**
     * @en Input box for count
     * @zh 数量输入框
     */
    @property(EditBox)
    public editboxInputCount: EditBox;

    /**
     * @en Button to reload the grid
     * @zh 重新加载网格的按钮
     */
    @property(Button)
    public btnReload: Button;

    /**
     * @en Button to refresh the grid
     * @zh 刷新网格的按钮
     */
    @property(Button)
    public btnRefresh: Button;

    /**
     * @en Instance of InfiniteGrid
     * @zh InfiniteGrid 的实例
     */
    private _list: InfiniteGrid;

    /**
     * @en Data array for the grid
     * @zh 网格的数据数组
     */
    private m_data: {Id: number, tag: string, cellIdentifier: string }[] = [];

    protected onLoad(): void {
        this._initListVertical();

        this.btnReload.node.on('click', this._listReload, this);
        this.btnRefresh.node.on('click', this._listRefresh, this);
    }

    private _listReload() {
        this._updateListData();
        this._list.Reload();
    }

    private _listRefresh() {
        this._updateListData();
        this._list.Refresh();
    }

    private _initListVertical() {
        this._updateListData();

        // IFDataSource
        const dataSource: IFDataSource = {
            GetCellNumber: (): number => {
                return this.m_data.length;
            },
            GetCellIdentifier: (dataIndex: number): string => {
                return this.m_data[dataIndex].cellIdentifier;
            },
            GetCellSize: (dataIndex: number): Size => {
                const identifier = dataSource.GetCellIdentifier(dataIndex);
                if (identifier === 'cellA') return size(150, 80);
                if (identifier === 'cellB') return size(250, 110);
                if (identifier === 'cellC') return size(300, 110);
            },
            GetCellView: (dataIndex: number) => {
                let node = undefined;
                const identifier = dataSource.GetCellIdentifier(dataIndex);
                if (identifier === 'cellA') node = instantiate(this.cellA);
                else if (identifier === 'cellB') node = instantiate(this.cellB);
                else if (identifier === 'cellC') node = instantiate(this.cellC);
                return node.getComponent('InfiniteCell') as InfiniteCell;
            },
            GetCellData: (dataIndex: number) => {
                return this.m_data[dataIndex];
            }
        };

        this._list = this.root.getComponent(InfiniteGrid);
        this._list.Init(dataSource);
    }

    private _updateListData() {
        const tag = this.editboxInputTag.string;
        const count = Number(this.editboxInputCount.string);

        const tmp = [
            'cellA',
            'cellA',
            'cellB',
            'cellC',
        ]

        let data = [];
        for (let i = 0; i < count; i++) {
            data.push({Id: i, tag: tag, cellIdentifier: tmp[i % tmp.length]});
        }

        this.m_data = data;
    }
}
