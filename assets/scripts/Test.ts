import { Component, Node, Size, _decorator, instantiate } from "cc";
import { IFDataSource, InfiniteGrid } from "./infinite-grid/InfiniteGrid";
import { InfiniteCell } from "./infinite-grid/InfiniteCell";
const { ccclass, property } = _decorator;

@ccclass('Test')
export class Test extends Component {

    @property(Node)
    public rootHorizontal: Node;

    @property(Node)
    public rootVertical: Node;

    @property(Node)
    public cellA: Node;

    @property(Node)
    public cellB: Node;

    public listVertical: InfiniteGrid;
    public listVerticalDelegate: ListVertical;

    public listHorizontal: InfiniteGrid;
    public listHorizontalDelegate: ListHorizontal;

    protected onLoad(): void {
        this._initGridVertical();
    }

    public onEnable(): void {
        this._initGridHorizontal();
        // this._updateGridHorizontal();
    }

    private _initGridVertical() {
        let data = [];
        for (let i = 0; i < 50; i ++) {
            data.push({ Id: i, row: Math.floor(i / 3), col: i % 3 });
        }
        let listDelegate = new ListVertical(this.cellA, this.cellB, data);
        this.listVerticalDelegate = listDelegate;

        let list = this.rootVertical.getComponent(InfiniteGrid);
        list.Init(listDelegate);
        this.listVertical = list;
    }

    private _initGridHorizontal() {
        let listDelegate = new ListHorizontal(this.cellA, this.cellB);
        this.listHorizontalDelegate = listDelegate;

        let data = [];
        for (let i = 0; i < 50; i ++) {
            data.push({ Id: i, row: Math.floor(i / 3), col: i % 3 });
        }
        this.listHorizontalDelegate.updateDelegateData(data);

        let list = this.rootHorizontal.getComponent(InfiniteGrid);
        list.Init(listDelegate);
        this.listHorizontal = list;
    }

    private _updateGridVertical() {
        // this.listVertical.Reload(true);
    }

    private _updateGridHorizontal() {
        let data = [];
        for (let i = 0; i < 50; i ++) {
            data.push({ Id: i, row: Math.floor(i / 3), col: i % 3 });
        }
        this.listHorizontalDelegate.updateDelegateData(data);
        this.listHorizontal.Reload(true);
    }
}

class ListVertical implements IFDataSource {

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

class ListHorizontal implements IFDataSource {

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