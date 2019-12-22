import React from "react";
import "./Nav.scss";

class Nav extends React.Component {
	constructor(props) {
		super(props);
		//console.log("props nav: ", props);
	}

	getSlidePerc = index => {
		return String(index * (100 / (this.props.slides.length - 1))) + "%";
	};

	render() {
		//console.log("Props:", this.props)

		const nav_lines = [];
		const nav_titles = [];
		for (let i = 0; i < this.props.slides.length; i++) {
			nav_lines.push(
				<a className="nav-anchor" style={{ top: this.getSlidePerc(i) }}>
					<div className="nav-line"></div>
				</a>
			);
			nav_titles.push(
				<li className="nav-title" style={{ top: this.getSlidePerc(i) }}>
					{this.props.slides[i].name}
				</li>
			);
		}

		return (
			<div className="nav-container">
				<div className="nav-bar-container">
					<div className="vertical-nav-line"></div>
					{nav_lines}
					<div
						className="location-icon"
						style={{ top: this.getSlidePerc(this.props.locIndex) }}
					></div>
				</div>
				<div className="nav-titles-container">{nav_titles}</div>
			</div>
		);
	}
}

export default Nav;
