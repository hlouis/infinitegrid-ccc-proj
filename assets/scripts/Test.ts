import { Component, Node, Size, _decorator, instantiate } from "cc";
import { IFDataSource, InfiniteGrid } from "./infinite-grid/InfiniteGrid";
import { InfiniteCell } from "./infinite-grid/InfiniteCell";
const { ccclass, property } = _decorator;

@ccclass('Test')
export class Test extends Component implements IFDataSource {

    @property(Node)
    public root: Node;

    @property(Node)
    public cellA: Node;

    @property(Node)
    public cellB: Node;

    private m_data: {Id: number}[] = [];

    protected onEnable(): void {

        let data = [];
        for (let i = 0; i < 50; i ++) {
            data.push({ Id: i, row: Math.floor(i / 3), col: i % 3 });
        }
        this.m_data = data;

        let list = this.root.getComponent(InfiniteGrid);
        list.Init(this);
        list.Reload();

    }


    ////////////////////////////////////////////////////////////
    // IFDataSource
    ////////////////////////////////////////////////////////////

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