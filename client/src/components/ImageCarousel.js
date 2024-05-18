import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Buffer } from 'buffer';
import Loading from './Loading';

const ImageCarousel = ({images}) => {
    const pictures = ["https://i.pinimg.com/564x/71/df/e7/71dfe758b89347f8a6ac63eb878dd88f.jpg", "https://i.pinimg.com/564x/40/d6/9f/40d69ff869ec10c298d7f35ff5fedf8b.jpg", "https://i.pinimg.com/564x/6b/47/26/6b472651dc4b422d6c794df0c7c7acde.jpg", "https://i.pinimg.com/736x/03/b8/44/03b8444021d91b41073cb14fd8ff934b.jpg", "https://i.pinimg.com/564x/ef/45/b1/ef45b1d25ee0b1647993c21a9da64c62.jpg"]


    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    if (images.length > 0) {
        return (
            <div className='mt-5 bg-gradient-to-r from-foreground to-black p-2'>
                <Carousel
                    swipeable={true}
                    draggable={false}
                    showDots={true}
                    responsive={responsive}
                    // ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    centerMode={true}
                    // autoPlay={deviceType !== "mobile" ? true : false}
                    focusOnSelect={true}
                    autoPlaySpeed={1000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    // removeArrowOnDeviceType={["tablet", "mobile"]}
                    
                    // deviceType={deviceType}
                    // dotListClass="custom-dot-list-style"
                    itemClass=""
                    >
                        {
                            Object.keys(images).map((i, j) => {
                                let image = Buffer.from(images[i].image.data, "binary").toString("base64")
                                return (
                                    <div key={j} className='mt-5 h-4/5 w-11/12 min-w-11/12 max-w-11/12'>
                                        <img className="h-full rounded-lg hover:h-auto" src={"data:image/jpg;base64,"+image}/>
                                    </div>
                                )
                            })
                        }
                </Carousel>;
            </div>
        )
    }

    else {
        return (
            <div className='mt-5'>
                <Carousel
                    swipeable={true}
                    draggable={false}
                    showDots={true}
                    responsive={responsive}
                    // ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    centerMode={true}
                    // autoPlay={deviceType !== "mobile" ? true : false}
                    focusOnSelect={true}
                    autoPlaySpeed={1000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    // deviceType={deviceType}
                    // dotListClass="custom-dot-list-style"
                    sliderClass="slider-class"
                    itemClass="carousel-item"
                    >
                        {Object.keys(pictures).map((i,j) => {
                            return (
                                <div key={j} className='mt-5 h-3/5 w-11/12 min-w-11/12 max-w-11/12'>
                                    <img className="h-full w-auto rounded-lg" src={pictures[i]}/>
                                </div>
                        )
                        })}
                </Carousel>
                {/* <h1 className="p-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">This board looks dry as hell!</h1> */}
            </div>
        )
    }
}

export default ImageCarousel