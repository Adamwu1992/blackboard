class MyTick extends egret.DisplayObjectContainer {
    constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, () => {
            // egret.startTick(this.renderTick, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.renderTick, this);
        }, this);
    }
    
    private renderTick(): boolean {
        this.render()
        return false;
    }

    private render(): void {
        if (this.numChildren > 0) {
            this.removeChildAt(0);
        }
        const time = egret.getTimer();
        const s = Math.floor(time / 1000);
        const ms = time % 1000;
        const text = `Run Time: ${s}s ${ms}ms`;
        const filed = new egret.TextField;
        filed.text = text;
        this.addChild(filed);
    }
}