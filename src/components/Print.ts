interface Print {
    start(x: number, y: number): void
    move(x: number, y: number): void
    end(x: number, y: number): void
}

type TPrint = Pen | Circle | Rect;

/**
 * 笔迹
 */
class Pen extends egret.Sprite implements Print {

    private lastX: number;
    private lastY: number;

    public constructor() {
        super();
    }

    public start(x: number, y: number): void {
        this.lastX = x;
        this.lastY = y;
        this.graphics.lineStyle(2, 0xf0f0f0);
    }
    public move(x: number, y: number): void {
        if (this.lastX && this.lastY) {
            this.graphics.moveTo(this.lastX, this.lastY);
            this.lastX = undefined;
            this.lastY = undefined;
        }
        this.graphics.lineTo(x, y);
    }
    public end(): void {
        this.graphics.endFill();
    }
}

class Circle extends egret.Shape implements Print {

    private startX: number;
    private startY: number;
    private endX: number;
    private endY: number;

    private getRadius(): number {
        const a = Math.abs(this.startX - this.endX);
        const b = Math.abs(this.startY - this.endY);
        const r = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        return r / 2;
    }

    public start(x: number, y: number): void {
        this.startX = x;
        this.startY = y;
    }

    public move(x: number, y: number): void {
        this.graphics.clear();
        this.endX = x;
        this.endY = y;
        this.graphics.lineStyle(2, 0xf0f0f0);
        this.graphics.drawCircle((this.startX + this.endX) / 2, (this.startY + this.endY) / 2, this.getRadius());
        this.graphics.endFill();
    }

    public end() {}
}

interface RectDesc {
    x: number,
    y: number,
    width: number;
    height: number;
}

class Rect extends egret.Shape implements Print {
    private startX: number;
    private startY: number;

    private getRectDesc(_x: number, _y: number): RectDesc {
        const x = Math.min(this.startX, _x);
        const y = Math.min(this.startY, _y);
        const width = Math.abs(this.startX - _x);
        const height = Math.abs(this.startY - _y);
        return { x, y, width, height }
    }

    public start(x: number, y: number): void {
        this.startX = x;
        this.startY = y;
    }

    public move(_x: number, _y: number): void {
        this.graphics.clear();
        const { x, y, width, height } = this.getRectDesc(_x, _y);
        this.graphics.lineStyle(2, 0xf0f0f0);
        this.graphics.drawRect(x, y, width, height);
        this.graphics.endFill();
    }

    public end() {}
}