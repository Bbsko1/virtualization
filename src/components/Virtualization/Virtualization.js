import { useState } from 'react';
import { throttle } from '../../helpers/throttle';

/* инициализируем массив из 100 элементов */
const arData = [...Array(100)].map((a, i) => i + 1);

export const Virtualization = () => {
    const [startNumber, setStartNumber] = useState(0);

    /* количество доп элементов с каждой стороны */
    const addNumbers = 1;
    /* общее число видимых элементов */
    const elementsCount = 4;

    /* высота одного элемента */
    const itemHeight = 60;

    /* Итоговая высота блока */
    const totalHeight = arData.length * itemHeight;

    const changeScroll = throttle((e) => {
        let num = Math.round(e.target.scrollTop / itemHeight);

        num -= addNumbers;

        if (num - addNumbers < 0) {
            num = 0;
        }

        setStartNumber(num);
    }, 0);

    /* вычленяем нужные элементы из исходного массива */
    const arEdit = arData.slice().splice(startNumber, elementsCount + (addNumbers * 2));

    return (
        <div
            className="virtualization"
            onScroll={changeScroll}
        >
            <ul
                className="virtualization__list"
                style={{height: `${totalHeight}px`,}}
            >
                {
                    arEdit.map((item, index) => (
                        <li
                            className="virtualization__item"
                            key={item}
                            style={
                                {
                                    transform: `translateY(${itemHeight * (startNumber + index)}px)`,
                                    lineHeight: `${itemHeight}px`,
                                }
                            }
                        >
                            {item}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};