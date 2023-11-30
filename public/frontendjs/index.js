//grab endpoint(s) to be consumed for the index screen.
// GET http://localhost:3000/api/vehicles HTTP/1.1 --> should letter change this to use render url
//GET A SPECIFIC CAR
// GET http://localhost:3000/api/vehicle?id=42 HTTP/1.1 --> should letter change this to use render url
//initialize alpine
document.addEventListener("alpine:init", () => {
  Alpine.data("vehicles", () => {
    return {
      vehicles: [],

      getVehicles() {
        let res = axios.get(
          "https://fuel-consumption-api-5zzb.onrender.com/api/vehicles"
        );
        res
          .then((data) => {
            data.json();
          })
          .then((data) => {
            this.vehicles = data;
          });
      },

      //functions you want to call immediately on page load
      init() {
        this.tile;
        this.getVehicles();
      },
    };
  });
});
