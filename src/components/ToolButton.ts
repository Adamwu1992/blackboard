interface Callback {
    (evt: egret.Event): void
}

class TouchEnabled extends egret.Sprite {

    private cb: Callback;

    set onClick(cb: Callback) {
        this.touchEnabled = true;
        // remove the old listener
        if (this.cb) {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cb, this);
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, cb, this);
        this.cb = cb;
    }

    set isClicked(flag: boolean) {
        if (flag) {
            this.renderActive();
        } else {
            this.renderNormal();
        }
    }

    public renderNormal() {}
    public renderActive() {}
}

class ToolButton extends TouchEnabled {

    private color: number;

    public constructor(x?: number, y?: number, width?: number, height?: number, color?: number) {
        super();

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;

        this.renderNormal();
    }

    public renderNormal() {
        this.graphics.clear();
        this.graphics.beginFill(this.color || 0xff713f);
        this.graphics.drawRect(0, 0, this.width || 50, this.height || 50);
        this.graphics.endFill();
    }
    
    public renderActive() {
        this.graphics.clear();
        this.graphics.beginFill(this.color || 0xff713f, .7);
        this.graphics.drawRect(0, 0, this.width || 50, this.height || 50);
        this.graphics.endFill();
    }
}