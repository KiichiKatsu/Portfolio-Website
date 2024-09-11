import '../Styles/Style.css';
import React, { useEffect, useState } from 'react';
import { motion, useDragControls, useMotionValue, useAnimate } from "framer-motion";
import useMeasure from "react-use-measure";

function Cards({ data }) {
    const [activeIndex, setActiveIndex] = useState(null);
    const [imgIndex, setImgIndex] = useState(0);
    const [scope, animate] = useAnimate();

    const [drawerRef, { height }] = useMeasure();

    const controls = useDragControls();
    const dragY = useMotionValue(0);
    const dragX = useMotionValue(0);

    const AUTO_DELAY = 1000 * 15;
    const DRAG_BUFFER = 30;

    const handleCardClick = (index) => { setActiveIndex(index); };

    const closeOverlay = async () => {
        animate(scope.current, { opacity: [1, 0] });
        const yStart = typeof dragY.get() === "number" ? dragY.get() : 0;
        await animate('#drawer', { y: [yStart, height] })
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

    useEffect(() => {
        const intervalRef = setInterval(() => {
            const x = dragX.get();

            if (x === 0) {
                setImgIndex((pv) => {
                    const currentItem = data[activeIndex];
                    if (currentItem && currentItem.images) {
                        const length = currentItem.images.length;
                        if (pv === length - 1) {
                            return 0;
                        }
                        return pv + 1;
                    }
                    return pv;
                });
            }
        }, AUTO_DELAY);

        return () => clearInterval(intervalRef);
    }, [AUTO_DELAY, activeIndex, data, dragX]);

    const onDragEnd = () => {
        const x = dragX.get();
        const currentItem = data[activeIndex];
        if (currentItem && currentItem.images) {
            const length = currentItem.images.length;
            if (x <= -DRAG_BUFFER && imgIndex < length - 1) {
                setImgIndex((pv) => pv + 1);
            } else if (x >= DRAG_BUFFER && imgIndex > 0) {
                setImgIndex((pv) => pv - 1);
            }
        }
    };

    const SPRING_OPTIONS = {
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
    };

    return (
        <>
            {data.map((item, index) => (
                <div className="Card" key={index} onClick={() => handleCardClick(index)}>
                    <div className="cardDisplay">
                        <img src={item.banner} alt={item.projectTitle} />
                    </div>
                    <h3>{item.projectTitle}</h3>
                    <p className="sm">{item.projectSubtitle}</p>

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
                                style={{ y: dragY }}
                                transition={{ ease: "easeInOut" }}
                                onDragEnd={() => { if (dragY.get() >= 100) { closeOverlay(); } }}
                                drag="y"
                                dragControls={controls}
                                dragListener={false}
                                dragConstraints={{ top: 0, bottom: 0 }}
                                dragElastic={{ top: 0, bottom: 0.5 }}
                            >
                                <div className='drawerHandle'>
                                    <button onPointerDown={(e) => controls.start(e)} />
                                </div>
                                <div className='drawerContent'>
                                    <h3>{item.projectTitle}</h3>
                                    <p>{item.projectDesc}</p>

                                    {/* Mapping over the images array */}
                                    <div className='carousel'>
                                        <motion.div
                                            drag="x"
                                            dragConstraints={{
                                                left: 0,
                                                right: 0
                                            }}
                                            style={{ x: dragX }}
                                            animate={{
                                                translateX: `-${imgIndex * 100}%`
                                            }}
                                            transition={SPRING_OPTIONS}
                                            onDragEnd={onDragEnd}
                                        >
                                            {item.images.map((image, idx) => (
                                                <div 
                                                    key={idx}
                                                    style={{ 
                                                        backgroundImage: `url(${image[0]})`,
                                                        backgroundSize: "contain",
                                                        backgroundPosition: "center",
                                                        backgroundRepeat: "no-repeat"
                                                    }}
                                                    animate={{ scale: imgIndex === idx ? 0.95 : 0.85, }}
                                                    transition={SPRING_OPTIONS}
                                                    className='carouselImage'
                                                />
                                            ))}
                                        </motion.div>
                                        <div className="carouselProgress">
                                            {item.images.map((image, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setImgIndex(idx)}
                                                    style={{
                                                        backgroundColor: `${idx === imgIndex ? "#FAFAFA" : "#1A1A1A"}`
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
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