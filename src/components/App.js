import React from "react";
import Slide from "./Slide";
import Nav from "./Nav";
import ReactDom from "react-dom";

import "./App.scss";
class App extends React.Component {
	constructor(props) {
		super(props);
		this.fetchSlides();
		this.state = {
			slides: [],
			currSlide: 0,
			scrolling: false
		};
	}

	fetchSlides = () => {
		fetch("http://localhost:3000/slides")
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log(data);
				const refsObj = {};

				for (let ind = 0; ind < data.length; ind++) {
					this[`slide_${ind}`] = React.createRef();
				}

				this.setState({ slides: data });
			})
			.catch(err => {
				console.log("error accessing api:\n", err);
			});
	};

	handleScroll = e => {
		//console.log('handle scroll triggered');
		//console.log("scroll detected:", e['deltaY']);

		if (!this.state.scrolling && Math.abs(e['deltaY']) > 20) {
			if (e["deltaY"] > 0) {
				//console.log("scrolling down");
				this.scrollToSlide(this.state.currSlide + 1);
			} else {
				//console.log("scrolling up");
				this.scrollToSlide(this.state.currSlide - 1);
			}
			//this.scrollToSlide(4);
		}
	};

	pauseScrolling = () => {
		this.setState({ scrolling: true });
		setTimeout(() => {
			this.setState({scrolling:false})
		}, 1000)
	}

	scrollToSlide = ind => {
		console.log("scrolling to slide:", ind);
		if (ind >= 0 && ind < this.state.slides.length) {
			const targetRef = this[`slide_${ind}`];
			targetRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
			this.setState({ currSlide: ind });
			this.pauseScrolling();
		}
	};

	componentDidMount() {
		const holder = ReactDom.findDOMNode(this.refs.holder);
		holder.addEventListener("mousewheel", this.handleScroll);
	}

	render() {
		const slideList = this.state.slides.map((slide, index) => {
			return (
				<div key={index} ref={this[`slide_${index}`]}>
					<Slide index={index} slide={slide} />
				</div>
			);
		});


		return (
			<div ref="holder" onScroll={this.handleScroll}>
				<Nav slides={this.state.slides} locIndex={this.state.currSlide} />
				{slideList}
			</div>
		);
	}
}

export default App;
