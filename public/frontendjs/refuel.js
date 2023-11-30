//grab endpoint(s) to be consumed for the refuel screen.
//REFUEL A VEHICLE
// POST http://localhost:3000/api/refuel HTTP/1.1 --> should letter change this to use render url
// {"vehicleId" : 43,"liters" : 30,"amount" : 675,"distance" :  56003,"filledUp" : true} --> this should come from the form.
document.addEventListener("alpine:init", () => {
  Alpine.data("refuel", () => {
    return {
      vehicleId: "",
      liters: "",
      amount: "",
      distance: "",

      refuel(carid, litres, amount, distance) {
        if (carid && litres && amount && distance) {
          (this.vehicleId = Number(carid)),
            (this.liters = Number(litres)),
            (this.amount = Number(amount)),
            (this.distance = Number(distance));
          axios.post("http://localhost:3000/api/refuel", {
            vehicleId: this.vehicleId,
            liters: this.liters,
            amount: this.amount,
            distance: this.distance,
            filledUp: true,
          });
        }
      },

      //functions you want to call immediately on page load
    };
  });
});
