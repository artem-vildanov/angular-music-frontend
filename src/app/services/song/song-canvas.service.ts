interface Point {
    x: number,
    y: number
}

export class SongCanvasService {
    private readonly animationSpeed = 0.08;
    private readonly context: CanvasRenderingContext2D;
    private animationProgress: number = 0;
    private animationFrameId!: number;
    private currentWidth: number = 0;
    private readonly targetWidth: number;
    private currentCoords!: Point;
    private initialCoords!: Point;
    private isAnimating: boolean = false;
    private isSelectAnimation: boolean = false;

    constructor(canvasElement: HTMLCanvasElement) {
        this.targetWidth = canvasElement.width * 1.2;
        this.initialCoords = this.calculateInitialCoords(canvasElement);
        this.currentCoords = this.calculateInitialCoords(canvasElement);
        this.context = canvasElement.getContext('2d')!;
        this.context.fillStyle = 'blue';
    }

    private calculateInitialCoords(element: HTMLCanvasElement): Point {
        return {
            x: element.width / 2,
            y: element.height / 2
        }
    }

    public fillCanvas(): void {
        if (this.isAnimating) this.stopAnimation();
        this.isSelectAnimation = true;
        this.isAnimating = true;
        this.animate();
    }

    public clearCanvas(): void {
        if (this.isAnimating) this.stopAnimation();
        this.isSelectAnimation = false;
        this.isAnimating = true;
        this.animate();
    }

    private animate(): void {
        if (this.isAnimating) {
            this.handleAnimation();
            this.animationFrameId = requestAnimationFrame(() => this.animate());
        }
    }

    private handleAnimation(): void {
        if (this.isSelectAnimation) {
            this.animationProgress = Math.min(this.animationProgress + this.animationSpeed, 1);
        } else {
            this.animationProgress = Math.max(this.animationProgress - this.animationSpeed, 0);
        }

        this.calculateCoords();
        this.drawFigure();

        if (this.animationProgress === 0 || this.animationProgress === 1) {
            this.stopAnimation();
        }
    }

    private calculateCoords(): void {
        this.currentWidth = this.targetWidth * this.animationProgress;
        this.currentCoords.x = this.initialCoords.x - this.currentWidth / 2;
        this.currentCoords.y = this.initialCoords.y - this.currentWidth / 2;
    }

    private drawFigure(): void {
        this.context.clearRect(0, 0, this.targetWidth, this.context.canvas.height);
        this.context.beginPath();
        this.context.roundRect(
            this.currentCoords.x,
            this.currentCoords.y,
            this.currentWidth,
            this.currentWidth,
            1000
        );
        this.context.closePath();
        this.context.fill();
    }

    private stopAnimation(): void {
        cancelAnimationFrame(this.animationFrameId);
        this.isAnimating = false;
    }
}
