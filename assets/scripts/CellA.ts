import { Label, _decorator } from "cc";
import { InfiniteCell } from "./infinite-grid/InfiniteCell";
const { ccclass, property } = _decorator;

@ccclass('CellA')
export class CellA extends InfiniteCell {

    @property(Label)
    public Label: Label;

    public CallBack() {};

    public UpdateContent(data: any) {
        this.Label.string = `${data.row} - ${data.Id}`;
    }
}