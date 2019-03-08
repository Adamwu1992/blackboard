class MyGrid extends egret.Shape {

    rows = 2;
    columns = 2;
    primaryColor = 0x0000ff;
    defaultColor = 0xff0000;

    public constructor(rows?: number, columns?: number) {
        super();

        if (rows) {
            this.rows = rows;
        }
        if (columns) {
            this.columns = columns;
        }

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function() {
            let alpha = this.alpha - 0.1
            this.alpha = alpha < 0.1 ? 1 : alpha;
        }, this)

        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.columns; j++) {
                this.drawRect(i, j);
            }
        }
    }

    private drawRect(row: number, column: number): void {
        const type = (row + column) % 2 === 0 ? 'primary' : 'default';
        const color = this[`${type}Color`];
        const x = this.x + column * 50;
        const y = this.y + row * 50;
        this.graphics.beginFill(color);
        this.graphics.drawRect(x, y, 50, 50);
        this.graphics.endFill();
    }
}