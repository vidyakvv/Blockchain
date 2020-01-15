import React, {Component} from 'react'
import './App.css';
class Main extends Component{

  render(){
    return(
        <div id = "content">
          <h1>Register</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const vin = this.VIN.value
          const odometer = this.Odometer.value
          const openxcdeviceid = this.OpenXC_ID.value
          const carmodel = this.CarModel .value
          const licenceplate = this.LicencePlate .value

         this.props.registerCar(vin,openxcdeviceid,odometer,carmodel,licenceplate)
        }}>



          <div className="form-group mr-sm-2">
            <input
              id="VIN"
              type="text"
              ref={(input) => { this.VIN = input }}
              className="form-control"
              placeholder="VIN"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="Odometer"
              type="text"
              ref={(input) => { this.Odometer = input }}
              className="form-control"
              placeholder="Odometer"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="OpenXC_ID"
              type="text"
              ref={(input) => { this.OpenXC_ID = input }}
              className="form-control"
              placeholder="OpenXC_ID"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="CarModel"
              type="text"
              ref={(input) => { this.CarModel = input }}
              className="form-control"
              placeholder="CarModel"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="LicencePlate"
              type="text"
              ref={(input) => { this.LicencePlate = input }}
              className="form-control"
              placeholder="LicencePlate"
              required />
              <p>&nbsp;</p>
          <button type="submit" className="btn btn-primary">Register</button>
          </div>
          </form>


          <hr/>
            <h2>Update</h2>
            <label>Only for Administrator</label>
          <hr/>
                  <form onSubmit={(event) => {
                  event.preventDefault()
                  const vin = this.VIN.value
                  const odometer = this.Odometer.value
                  this.props.updateOdometer(vin,odometer)
                 }}>

                <input
                id ="VIN"
                type='text'
                ref={(input) => { this.VIN = input }}
                placeholder="VIN"
                className="form-control"
                required/>
                <input
                id ="Odometer"
                type='text'
                ref={(input) => { this.Odometer = input }}
                placeholder="Odometer"
                className="form-control"
                required/>
                <button type="submit" className="btn btn-primary">Update</button></form>
          <hr/>

              <form  onSubmit={(event) => {
                event.preventDefault()
                const vin = this.VIN.value
                const maintRating = this.maintenanceRating.value
                this.props.updateMaintenanceRating(vin,maintRating)
               }}>

              <input
              id ="VIN"
              type='text'
              ref={(input) => { this.VIN = input }}
              placeholder="VIN"
              className="form-control"
              required/>
              <input
              id ="maintenanceRating"
              type='text'
              ref={(input) => { this.maintenanceRating = input }}
              placeholder="Maintenance Rating"
              className="form-control"
              required/>
              <button type="Submit" className="btn btn-primary">Update</button></form>
              <hr/>
              <form name="Driver" onSubmit={(event) => {
                event.preventDefault()
                const vin = this.VIN.value
                const driverRating = this.driverRating.value
                this.props.updateDrivingRating(vin,driverRating)
               }}>

              <input
              id ="VIN"
              type='text'
              ref={(input) => { this.VIN = input }}
              placeholder="VIN"
              className="form-control"
              required/>
              <input
              id ="driverRating"
              type='text'
              ref={(input) => { this.driverRating = input }}
              placeholder="Driver Rating"
              className="form-control"
              required/>
              <button type="submit" className="btn btn-primary">Update</button></form>

          <p>&nbsp;</p>
          <hr/>

          <h4>Get Car Details</h4>
          <form onSubmit= { (event) => {
            event.preventDefault()
            const vin = this.VIN.value
            this.props.carVinDetails(vin)
            //this.setState({ carOwner: cardetails.carOwner });
            //this.setState({ openXCDeviceId: cardetails.openXCDeviceId });
            //this.setState({ carModel: cardetails.carModel });
          //  this.setState({ licencePlate: cardetails.licencePlate });
            //this.setState({ odometer: cardetails.odometer });
            //this.setState({ maintenanceRating: cardetails.maintenanceRating });
            //this.setState({ drivingBehaviorRating: cardetails.drivingBehaviorRating });

           }}>

          <div className="form-group a-b-c">
          <div style={{ display: "flex" }}>
            <button
              style={{ marginCenter: "auto" }}
            >
              Get Details
            </button>
            <input
              id="VIN"
              type="text"
              ref={(input) => { this.VIN = input }}
              className="form-control"
              placeholder="VIN"
              
              required />


          </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Main;
