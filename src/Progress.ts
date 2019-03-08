class Progress extends egret.Shape {
    
    private angle = 0;
    private radius = 50;

    public constructor(x?: number, y?: number, r?: number) {
        super();
        this.x = x || 0;
        this.y = y || 0;
        this.radius = r || 50;

        const timer = new egret.Timer(100, 180);

        timer.addEventListener(egret.TimerEvent.TIMER, () => {
            this.angle += 2;
            this.changeAngle();
        }, this);

        timer.start();

    }

    private changeAngle(): void {

        const x = this.x + this.radius;
        const y = this.y = this.radius;
        const r = this.radius;

        this.graphics.clear();
        this.graphics.beginFill(0xff713f);
        this.graphics.moveTo(x, y);
        this.graphics.lineTo(x + r, y);
        this.graphics.drawArc(x, y, r, -0.5 * Math.PI, (this.angle / 180 - 0.5) * Math.PI, false);
        this.graphics.lineTo(x, y);
        this.graphics.endFill();
    }
}