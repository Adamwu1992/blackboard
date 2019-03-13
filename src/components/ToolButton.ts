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
            log('focus', this.width, this.x);
        } else {
            log('blur');
        }
    }
}

class ToolButton extends TouchEnabled {

    public constructor(x?: number, y?: number, width?: number, height?: number, color?: number) {
        super();

        this.x = x;
        this.y = y;

        this.graphics.beginFill(color || 0xff713f);
        this.graphics.drawRect(0, 0, width || 50, height || 50);
        // this.graphics.drawCircle(x || 50, y || 50, 50);
        this.graphics.endFill();
    }
}