import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Buffer } from "buffer";

const ImageCarousel = ({ images }) => {
	const pictures = [
		"https://i.pinimg.com/736x/fa/36/a7/fa36a79d487420d4a3bb623334b1a305.jpg",
		"https://i.pinimg.com/originals/ad/ea/b1/adeab11a30cb6afb42ae87e31fa0a0eb.jpg",
		"https://i.pinimg.com/originals/57/a8/fa/57a8fad4975df92eb6bd6f70d06b6dfc.jpg",
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9dlWn1-GO3WFhKOYBM4oghDbUPPzBrZkKRvrPk-FlsKODNeOZ9RSs2nPBbROyOu3FUGc&usqp=CAU",
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB-XJBFJcz7B9znvQ5lbZaeCs3yBC6DQBWmGMiFA1uA77_oI4kVRCd1czvL2LSsK5-Dr4&usqp=CAU",
		"https://i.pinimg.com/originals/32/0d/fa/320dfa98efded1f9371160f0cad0eebb.jpg",
	];

	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3,
			slidesToSlide: 3, // optional, default to 1.
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
			slidesToSlide: 2, // optional, default to 1.
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
			slidesToSlide: 1, // optional, default to 1.
		},
	};

	if (images.length > 0) {
		return (
			<div className="mt-5 p-2">
				<Carousel
					swipeable={true}
					draggable={false}
					showDots={true}
					responsive={responsive}
					arrows={true}
					infinite={true}
					centerMode={true}
					autoPlay={true}
					focusOnSelect={true}
					autoPlaySpeed={3000}
					keyBoardControl={true}
					customTransition="all .5"
					transitionDuration={500}
					containerClass="carousel-container"
					dotListClass="custom-dot-list-style"
					itemClass="carousel-item">
					{Object.keys(images).map((i, j) => {
						let image = Buffer.from(images[i].image.data, "binary").toString("base64");
						return (
							<div
								key={j}
								className="mt-5 h-4/5 w-11/12 min-w-11/12 max-w-11/12">
								<img
									className="h-full rounded-lg hover:h-auto"
									src={"data:image/jpg;base64," + image}
								/>
							</div>
						);
					})}
				</Carousel>
				;
			</div>
		);
	} else {
		return (
			<div className="mt-5 p-2">
				<Carousel
					swipeable={true}
					draggable={false}
					showDots={true}
					responsive={responsive}
					// ssr={true} // means to render carousel on server-side.
					infinite={true}
					centerMode={true}
					autoPlay={true}
					focusOnSelect={true}
					autoPlaySpeed={3000}
					keyBoardControl={true}
					customTransition="all .5"
					transitionDuration={500}
					containerClass="carousel-container"
					removeArrowOnDeviceType={["tablet", "mobile"]}
					dotListClass="custom-dot-list-style"
					// deviceType={deviceType}
					sliderClass="slider-class"
					itemClass="carousel-item">
					{Object.keys(pictures).map((i, j) => {
						return (
							<div
								key={j}
								className="mt-5 h-4/5 w-11/12 min-w-11/12 max-w-11/12">
								<img
									className="h-full rounded-lg hover:h-auto"
									src={pictures[i]}
								/>
							</div>
						);
					})}
				</Carousel>
				{/* <h1 className="p-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
					This board looks dry as hell!
				</h1> */}
			</div>
		);
	}
};

export default ImageCarousel;
