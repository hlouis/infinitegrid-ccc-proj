import { Component, Node, Size, _decorator, instantiate } from "cc";
import { IFDataSource, InfiniteGrid } from "./infinite-grid/InfiniteGrid";
import { InfiniteCell } from "./infinite-grid/InfiniteCell";
import { CellA } from "./CellA";
const { ccclass, property } = _decorator;

@ccclass('Test')
export class Test extends Component implements IFDataSource {

    @property(Node)
    public root: Node;

    @property(Node)
    public cellA: Node;

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

    GetCellIdentifer(dataIndex: number): string {
        return this.m_data[dataIndex].Id.toString();
    }

    GetCellSize(dataIndex: number): Size {
        return new Size(150, 80);
    }

    GetCellView(index: number): InfiniteCell {
        let node = instantiate(this.cellA);
        return node.getComponent(CellA);
    }

    GetCellData(index: number): any {
        return this.m_data[index];
    }
}