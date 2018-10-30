
class Circle{
    constructor()  {
    }
    render(drawingContext, attr) {
        drawingContext.beginPath();
        drawingContext.arc(attr.x , attr.y, attr.r, 0, 2*Math.PI);
        drawingContext.stroke();
    }
}