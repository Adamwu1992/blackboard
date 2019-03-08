interface Callback {
    (evt: egret.Event): void
}

class ToolButton extends egret.Shape {
    public constructor() {
        super();

        this.graphics.beginFill(0xff713f);
        this.graphics.drawCircle(50, 50, 50);
        this.graphics.endFill();
    }

    set onClick(cb: Callback) {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, cb, this);
    }
}