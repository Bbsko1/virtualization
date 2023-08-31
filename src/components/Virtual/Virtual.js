import { cloneElement, useMemo, useState } from 'react';
import { throttle } from '../../helpers/throttle';


export const Virtual = (props) => {
    const {children, additionCount = 0, viewCount, width, height, itemHeight} = props;

    const [startNumber, setStartNumber] = useState(0);

    const totalHeight = children.length * itemHeight;

    const changeScroll = throttle((e) => {
        let num = Math.round(e.target.scrollTop / itemHeight);

        num -= additionCount;

        if (num - additionCount < 0) {
            num = 0;
        }

        setStartNumber(num);
    }, 100);
    
    const cloneChildren = useMemo(() => {
        return children.slice()
        .splice(startNumber, viewCount + (additionCount * 2))
        .map((item, index) => 
        cloneElement(item, {
            style: {
                position: 'absolute',
                height: `${itemHeight}px`,
                transform: `translateY(${itemHeight * (startNumber + index)}px)`,
            }
        }));
    }, [additionCount, children, itemHeight, startNumber, viewCount]);

    return (
        <div className='virtual-container' 
            onScroll={changeScroll}
            style={
                {
                    height: `${height}px`,
                    width: `${width}px`,
                }
                }>
            <ul className='virtual-list' style={{height: `${totalHeight}px`}}>
                {cloneChildren}
            </ul>
        </div>
    );
}