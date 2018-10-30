
export default class Circle{
    constructor()  {
    }
    render(ctx, attr) {
        console.log(attr._attr)
        let props = attr._attr;
        ctx.beginPath();
        ctx.arc(props.x , props.y, props.r, 0, 2 * Math.PI);
        ctx.fillStyle = props.color;
        ctx.fill();
        ctx.stroke();
    }
}