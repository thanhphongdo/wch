import { Component, Vue } from 'vue-property-decorator';
import template from './home.vue';
import { Enums } from '../shared/enum';
import { Map } from '../core/map';

declare let Snap: any;
let cellSize = Enums.CELL_SIZE;

@Component({
    mixins: [template],
    components: {
    }
})
export default class Home extends Vue {
    public cellList: Array<Cell> = [];

    data() {
        return {
            cellList: []
        };
    }

    mounted() {
        let self = this;
        let app: any = Snap('#svg');
        let map = new Map(app);
        setTimeout(() => {
            map.drawMap();
        }, 100);
    }
}

export class Cell {
    public app: any;

    public x: number;

    public y: number;

    public attr?: number;

    public cell: any;

    public name: string;

    constructor(app: any, x: number, y: number, attr?: any) {
        this.app = app;
        this.x = x;
        this.y = y;
        this.name = `${x}_${y}`;
        this.attr = this.attr;
        this.draw(x, y, attr);
    }

    draw(x: number, y: number, attr: any) {
        let snapX = x * cellSize;
        let snapY = y * cellSize;
        this.cell = this.app.rect(snapX, snapY, cellSize, cellSize, 0, 0).attr(attr);
    }

    setAttr(attr: any) {
        this.cell.attr(attr);
    }

    hover(callback: Function) {
        let self = this;
        this.cell.hover(() => {
            callback(self);
        });
    }

    mouseout(callback: Function) {
        let self = this;
        this.cell.mouseout(() => {
            callback(self);
        });
    }
}
