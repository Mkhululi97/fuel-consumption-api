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
      addVehicle(desc, regNum) {
        if ((desc, regNum)) {
          this.description = desc;
          this.regNumber = regNum;
          let res = axios.post("http://localhost:3000/api/vehicle", {
            description: this.description,
            regNumber: this.regNumber,
          });
          res.then((data) => {
            if (data.data.status === "success") {
              this.carAddedSuccess =
                data.data.status + " your car has been added";
            } else if (data.data.status === "error") {
              this.carNotAdded = data.data.status + " " + data.data.message;
            }
          });
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
