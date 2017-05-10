function Graph(config) {
    // user defined properties
    this.canvas = document.getElementById(config.canvasId);

    // relationships
    this.context = this.canvas.getContext('2d');

    this.colorCurve = config.color;
    this.colorBackground = config.background;
    this.thickness = config.thickness;
    this.canvas.style.background = config.background;
    this.colorRefresh = config.colorRefresh;

    this.unitX = this.canvas.width;
    this.unitY = this.canvas.height;

    this.pointer = 0;
    this.value = 0;
}

Graph.prototype.drawNewData = function (val) {
    var context = this.context;
    context.beginPath();
    context.lineWidth = this.thickness;

    if (this.pointer === this.unitX)
    {
        this.pointer = 0;
        context.moveTo(0, this.unitY);
        context.lineTo(0, 0);
    }
    var lineWidth = parseInt(this.thickness);
    context.lineWidth = 2;
    context.strokeStyle = this.colorBackground;
    var colClear = this.pointer + lineWidth;
    context.moveTo(colClear, this.unitY);
    context.lineTo(colClear, 0);
    context.stroke();

    context.beginPath();
    context.strokeStyle = this.colorRefresh;
    context.lineWidth = 2;
    context.moveTo(colClear + 1, this.unitY);
    context.lineTo(colClear + 1, 0);

    context.stroke();

    context.beginPath();
    context.strokeStyle = this.colorBackground;
    context.lineWidth = this.thickness;
    context.moveTo(this.pointer, this.value);
    context.strokeStyle = this.colorCurve;
    this.pointer++;
    this.value = this.unitY - val;
    context.lineTo(this.pointer, this.value);
    context.stroke();
};