/* eslint-disable */
let instance = null;
import _ from "lodash";

class ImgResource {
	static getInstance() {
		if (!instance) {
			instance = new ImgResource();
		}
		
		return instance;
	}

	constructor() {
		
		this.imgs = {
			entrance: require("./images/entrance.jpg"),
			edit: require("./images/edit.png"),
			S: require("./images/S.png"),
			M: require("./images/M.png"),
			L: require("./images/L.png"),
		};
	}

	get(name) {
		return this.imgs[name];
	}

	getString(name) {
		return this.string[name];
	}
}

export default ImgResource.getInstance();
