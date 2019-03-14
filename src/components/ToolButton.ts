interface Callback {
    (evt: egret.Event): void
}

interface MenuType {
    color: number
    label: string
}

// color ref: https://yoshino-ui.github.io/#/docs/components/color
const MenuType = {
    PEN: {
        color: 0xe57373,
        label: 'Pen'
    },
    CIRCLE: {
        color: 0xec407a,
        label: 'Circle'
    },
    RECTANGLR: {
        color: 0x880e4f,
        label: 'Rectangle'
    },
    CALCEL: {
        color: 0xbdbdbd,
        label: 'Cancel'
    },
    SAVE: {
        color: 0x004d40,
        label: 'Save'
    }
}


class TouchEnabled extends egret.Sprite {

    private cb: Callback;

    protected label: string;

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
            log('switched to', this.label);
        } else {
            this.renderNormal();
        }
    }

    public renderNormal() {}
    public renderActive() {}
}

class ToolButton extends TouchEnabled {

    private color: number;

    public constructor(x?: number, y?: number, width?: number, height?: number, type?: MenuType) {
        super();

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = type.color;
        this.label = type.label

        this.renderNormal();
        this.renderLabel(type.label);
    }

    public renderLabel(label: string): void {
        const field = new egret.TextField;
        field.height = this.height;
        field.width = this.width;
        field.textColor = 0x333333;
        field.textAlign = egret.HorizontalAlign.CENTER;
        field.verticalAlign = egret.VerticalAlign.MIDDLE;
        field.size = 14;
        field.text = label;
        this.addChild(field);
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