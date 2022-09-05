const Parkings = require("./mock.json");
const _ = require("lodash");

const Entrance2 = {
	"car": {
		"id": 1,
		"name": "M",
		"plateNo": "XYZ123",
		"ref": {
			"current": null
		}
	},
	"id": 1,
	"top": 0,
	"left": 0,
	"name": "P1",
	"status": "enter",
	"width": 78.54545593261719,
	"height": 89.81818389892578,
}

const Entrance = {
  "car": {
		"id": 1,
		"name": "S",
		"plateNo": "XYZ123",
	},
	"height": 89.81818389892578,
	"id": 3,
	"left": 157.09091186523438,
	"name": "P3",
	"top": 0,
	"width": 78.54545593261719
};



const App = () => {

  const carSize = Entrance.car.name;
  const entranceX = (Entrance.left + Entrance.width)/2;
  const entranceY = (Entrance.top + Entrance.height)/2;
  let storeDistance = null;
  let itemAvailable = null;

  _.forEach(Parkings, park => {
    const parkingX = (park.left + park.width)/2;
    const parkingY = (park.top + park.height)/2;
    const x2x1 = Math.pow(parkingX - entranceX, 2);
    const y2y1 = Math.pow(parkingY - entranceY, 2);
    const distance =  Math.sqrt(x2x1 + y2y1);

    // console.log("park",park);
    // console.log("parkingX",parkingX);
    // console.log("parkingY",parkingY);
    // console.log("x2x1",x2x1);
    // console.log("y2y1",y2y1);
    console.log("distance",distance);

    if((carSize === "L" && ["LP"].includes(park.parkingdetails.name)) && !park.park ){
      if(storeDistance === null || distance < storeDistance){
        console.log("carSizecarSize", carSize, ["LP"].includes(park.parkingdetails.name), park.parkingdetails.name)

        storeDistance = distance;
        itemAvailable = park;
      }
     
    }else if((carSize === "M" && ["LP", "MP"].includes(park.parkingdetails.name)) && !park.park ){
       if(storeDistance === null || distance < storeDistance){
        console.log("carSizecarSize", carSize, ["LP", "MP"].includes(park.parkingdetails.name), park.parkingdetails.name)

        storeDistance = distance;
        itemAvailable = park;
      }
    }else if((carSize === "S" && ["LP", "MP", "SP"].includes(park.parkingdetails.name)) && !park.park ){
       if(storeDistance === null || distance < storeDistance){
        console.log("carSizecarSize", carSize, ["LP", "MP", "SP"].includes(park.parkingdetails.name), park.parkingdetails.name)

        storeDistance = distance;
        itemAvailable = park;
      }
    }

    

    // if(storeDistance === null || distance < storeDistance){
    //   storeDistance = distance;


      
    // };
  });

  // for(let park in Parkings){

  // }

  console.log("storeDistance", storeDistance);
  console.log("itemAvailable", itemAvailable);




  // const parkIndex = _.findIndex(Parkings, item => {
  //   const parkingX = (item.left + item.width)/2;
  //   const parkingY = (item.top + item.height)/2;
  //   const x2x1 = Math.pow(parkingX - entranceX, 2);
  //   const y2y1 = Math.pow(parkingY - entranceY, 2);
  //   const distance =  Math.sqrt(x2x1 + y2y1);

  //   if(storeDistance === null || distance < storeDistance){

  //   };


    // if((carSize === "L" && item.parkingdetails.name === "LP") && !item.park ){
    //   return item;
    // }else if((carSize === "M" && ["LP", "MP"].includes(item.parkingdetails.name)) && !item.park ){
    //   return item;
    // }else if((carSize === "S" && ["LP", "MP", "SP"].includes(item.parkingdetails.name)) && !item.park ){
    //   return item;
    // }
  // });

};

App();