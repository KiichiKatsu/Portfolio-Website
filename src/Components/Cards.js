import '../Styles/Style.css';
import React, { useEffect, useState } from 'react';
import { motion, useDragControls, useMotionValue, useAnimate } from "framer-motion";
import useMeasure from "react-use-measure";

function Cards({ data }) {
    const [activeIndex, setActiveIndex] = useState(null);
    const [scope, animate] = useAnimate();

    const [drawerRef, { height }] = useMeasure();

    const controls = useDragControls();
    const yDrag = useMotionValue(0);

    const handleCardClick = (index) => {
        setActiveIndex(index);
    };

    const closeOverlay = async () => {
        animate(scope.current, {
            opacity: [1, 0]
        });

        const yStart = typeof yDrag.get() === "number" ? yDrag.get() : 0;
        await animate('#drawer', {
            y: [yStart, height]
        })
        setActiveIndex(null);
    };

    useEffect(() => {
        if (activeIndex !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [activeIndex]);

    return (
        <>
            {data.map((item, index) => (
                <div className="Card" key={index} onClick={() => handleCardClick(index)}>
                    <div className="cardDisplay">
                        <img src={item[0]} alt={item[1]} />
                    </div>
                    <h3>{item[1]}</h3>
                    <p className="light">{item[2]}</p>

                    {activeIndex === index && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 100 }}
                            className="drawerContainer"
                            ref={scope}
                            onClick={(e) => { e.stopPropagation(); closeOverlay(); }}
                        >
                            <motion.div
                                id='drawer'
                                ref={drawerRef}
                                onClick={(e) => { e.stopPropagation(); }}
                                initial={{ y: "100%" }}
                                animate={{ y: "0%" }}
                                style={{ y: yDrag }}
                                transition={{ ease: "easeInOut" }}
                                onDragEnd={() => { if (yDrag.get() >= 100) { closeOverlay(); } }}
                                drag="y"
                                dragControls={controls}
                                dragListener={false}
                                dragConstraints={{ top: 0, bottom: 0 }}
                                dragElastic={{ top: 0, bottom: 0.5 }}
                            >
                                <div className='drawerHandle'>
                                    <button
                                        onPointerDown={(e) => controls.start(e)}
                                    />
                                </div>
                                <div className='drawerContent'>
                                    <h1>DRAWER {item[1]}</h1>
                                    <h2>
                                        Laudantium corrupti neque rerum labore tempore sapiente. Quos, nobis
                                        dolores. Esse fuga, cupiditate rerum soluta magni numquam nemo
                                        aliquid voluptate similique deserunt!
                                    </h2>
                                    <h2>
                                        Rerum inventore provident laboriosam quo facilis nisi voluptatem
                                        quam maxime pariatur. Velit reiciendis quasi sit magni numquam quos
                                        itaque ratione, fugit adipisci atque est, tenetur officiis explicabo
                                        id molestiae aperiam? Expedita quidem inventore magni? Doloremque
                                        architecto mollitia, dicta, fugit minima velit explicabo sapiente
                                        beatae fugiat accusamus voluptatum, error voluptatem ab asperiores
                                        quo modi possimus.
                                    </h2>
                                    <h2>
                                        Laudantium corrupti neque rerum labore tempore sapiente. Quos, nobis
                                        dolores. Esse fuga, cupiditate rerum soluta magni numquam nemo
                                        aliquid voluptate similique deserunt!
                                    </h2>
                                    <h2>
                                        Rerum inventore provident laboriosam quo facilis nisi voluptatem
                                        quam maxime pariatur. Velit reiciendis quasi sit magni numquam quos
                                        itaque ratione, fugit adipisci atque est, tenetur officiis explicabo
                                        id molestiae aperiam? Expedita quidem inventore magni? Doloremque
                                        architecto mollitia, dicta, fugit minima velit explicabo sapiente
                                        beatae fugiat accusamus voluptatum, error voluptatem ab asperiores
                                        quo modi possimus.
                                    </h2>
                                    <h2>
                                        Laudantium corrupti neque rerum labore tempore sapiente. Quos, nobis
                                        dolores. Esse fuga, cupiditate rerum soluta magni numquam nemo
                                        aliquid voluptate similique deserunt!
                                    </h2>
                                    <h2>
                                        Rerum inventore provident laboriosam quo facilis nisi voluptatem
                                        quam maxime pariatur. Velit reiciendis quasi sit magni numquam quos
                                        itaque ratione, fugit adipisci atque est, tenetur officiis explicabo
                                        id molestiae aperiam? Expedita quidem inventore magni? Doloremque
                                        architecto mollitia, dicta, fugit minima velit explicabo sapiente
                                        beatae fugiat accusamus voluptatum, error voluptatem ab asperiores
                                        quo modi possimus.
                                    </h2>
                                    <h2>
                                        Laudantium corrupti neque rerum labore tempore sapiente. Quos, nobis
                                        dolores. Esse fuga, cupiditate rerum soluta magni numquam nemo
                                        aliquid voluptate similique deserunt!
                                    </h2>
                                    <h2>
                                        Rerum inventore provident laboriosam quo facilis nisi voluptatem
                                        quam maxime pariatur. Velit reiciendis quasi sit magni numquam quos
                                        itaque ratione, fugit adipisci atque est, tenetur officiis explicabo
                                        id molestiae aperiam? Expedita quidem inventore magni? Doloremque
                                        architecto mollitia, dicta, fugit minima velit explicabo sapiente
                                        beatae fugiat accusamus voluptatum, error voluptatem ab asperiores
                                        quo modi possimus.
                                    </h2>
                                </div>
                            </motion.div>

                        </motion.div>
                    )}
                </div>
            ))}
        </>
    )
}

export default Cards;