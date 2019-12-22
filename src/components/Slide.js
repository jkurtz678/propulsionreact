import React from "react";
import "./Slide.scss"

class Slide extends React.Component {
	render() {
		return <div className="slide">{this.props.slide.name}</div>;
	}
}

export default Slide;