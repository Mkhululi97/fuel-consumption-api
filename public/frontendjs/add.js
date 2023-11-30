//grab endpoint(s) to be consumed for the add screen.
//ADD A VEHICLE
// POST http://localhost:3000/api/vehicle HTTP/1.1 --> should letter change this to use render url
// {"description": "sample vehicle","regNumber": "CAA 780-123"} --> this should come from the form.
document.addEventListener("alpine:init", () => {
  Alpine.data("add", () => {
    return {
      description: "",
      regNumber: "",
      carAddedSuccess: "",
      carNotAdded: "",
      //use description and registration number to , add vehicles to the app
      addVehicle(desc, regNum) {
        //check if input feilds are inputed
        if ((desc, regNum)) {
          //update variables to use value coming from the inputs
          this.description = desc;
          this.regNumber = regNum;
          //call api that add vehicles to the app
          let res = axios.post(
            "https://fuel-consumption-api-5zzb.onrender.com/api/add",
            {
              description: this.description,
              regNumber: this.regNumber,
            }
          );
          res.then((data) => {
            //update user about their form submission
            if (data.data.status === "success") {
              this.carAddedSuccess =
                data.data.status + " your car has been added";
            } else if (data.data.status === "error") {
              this.carNotAdded = data.data.status + " " + data.data.message;
            }
          });
          //clear all updates after 3500
          setTimeout(() => {
            this.carAddedSuccess = "";
            this.carNotAdded = "";
          }, 3500);
          return res;
        }
      },
    };
  });
});
