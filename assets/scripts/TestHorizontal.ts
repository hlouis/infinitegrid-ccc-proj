import { Button, Component, EditBox, Node, Size, _decorator, instantiate } from "cc";
import { IFDataSource, InfiniteGrid } from "./infinite-grid/InfiniteGrid";
import { InfiniteCell } from "./infinite-grid/InfiniteCell";
const { ccclass, property } = _decorator;

@ccclass('TestHorizontal')
export class TestHorizontal extends Component {

    @property(Node)
    public root: Node;

    @property(Node)
    public cellA: Node;

    @property(Node)
    public cellB: Node;

    @property(EditBox)
    public editboxInputTag: EditBox;

    @property(EditBox)
    public editboxInputCount: EditBox;

    @property(Button)
    public btnReload: Button;

    @property(Button)
    public btnRefresh: Button;

    public list: InfiniteGrid;
    public listDelegate: ListDelegate;

    protected onLoad(): void {
        this.btnReload.node.on('click', this._listReload, this);
        this.btnRefresh.node.on('click', this._listRefresh, this);
    }

    public onEnable(): void {
        this._initGrid();
        this._listReload();
    }

    private _listReload() {
        const tag = this.editboxInputTag.string;
        const count = Number(this.editboxInputCount.string);
        this._updateListData(tag, count);
        this.list.Reload();
    }

    private _listRefresh() {
        const tag = this.editboxInputTag.string;
        const count = Number(this.editboxInputCount.string);
        this._updateListData(tag, count);
        this.list.Refresh();
    }

    private _initGrid() {
        let listDelegate = new ListDelegate(this.cellA, this.cellB);
        this.listDelegate = listDelegate;

        let list = this.root.getComponent(InfiniteGrid);
        list.Init(listDelegate);
        this.list = list;
    }

    private _updateListData(tag: string, count: number) {
        let data = [];
        for (let i = 0; i < count; i ++) {
            data.push({ Id: i, tag: tag });
        }
        this.listDelegate.updateDelegateData(data);
    }
}

class ListDelegate implements IFDataSource {

    private cellA: Node;
    private cellB: Node;
    private m_data: {Id: number, row: number, col: number}[] = [];

    constructor(cellA: Node, cellB: Node, data?: any) {
        this.cellA = cellA;
        this.cellB = cellB;
        if (data) {
            this.m_data = data;
        }
    }

    updateDelegateData(data) {
        this.m_data = data;
    }

    GetCellNumber(): number {
        return this.m_data.length;
    }

    GetCellIdentifer(index: number): string {
        return index % 3 == 2 ? 'cellA' : 'cellB';
    }

    GetCellSize(index: number): Size {
        return index % 3 == 2 ? new Size(150, 80) : new Size(170, 110);
    }

    GetCellView(index: number): InfiniteCell {
        let node = index % 3 == 2 ? instantiate(this.cellA) : instantiate(this.cellB);
        return node.getComponent('InfiniteCell') as InfiniteCell;
    }

    GetCellData(index: number): any {
        return this.m_data[index];
    }
}
