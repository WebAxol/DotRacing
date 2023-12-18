const setAsScreenHeight = () => {
    const screenHeighted = document.getElementsByClassName('screen-height');
    for (let el of screenHeighted) {
        let screenHeight = window.innerHeight;
        let elementStyle = window.getComputedStyle(el);
        if (!elementStyle.marginTop.includes('px') || !elementStyle.marginBottom.includes('px')) {
            console.error('cannot set height to an element whose margin is not established in pixels');
            continue;
        }
        let elementTopMargin = parseFloat(elementStyle.marginTop.split(/px/)[0]);
        let elementBottomMargin = parseFloat(elementStyle.marginBottom.split(/px/)[0]);
        el.style.height = `${screenHeight - (elementTopMargin + elementBottomMargin)}px`;
    }
};
export default setAsScreenHeight;
//# sourceMappingURL=screenHeight.js.map