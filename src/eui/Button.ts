class Button extends eui.Component {

    labelDisplay: eui.Label;

    private _label: string = '';
    private touchDown: boolean = false;

    constructor() {
        super();

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouched, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouched, this);
    }

    private onTouched(evt: egret.TouchEvent) {
        switch(evt.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this.touchDown = true;
                break;
            case egret.TouchEvent.TOUCH_END:
                this.touchDown = false;
                break;
        }
        this.invalidateState();
    }

    get label() {
        return this._label;
    }
    set label(s: string) {
        this._label = s;
        if (this.labelDisplay) {
            this.labelDisplay.text = s;
        }
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        if (this.labelDisplay) {
            this.labelDisplay.text = this._label;
        }
    }

    protected getCurrentState(): string {
        if (!this.enabled) {
            return "disabled";
        }
        if (this.touchDown) {
            return "down";
        }
        return "up";
    }
}