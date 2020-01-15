import React, {Component} from 'react'
import Web3 from 'web3'
import './App.css'
import Navbar from './Navbar'
import Main from './Main'
import Car from './Car'

class App extends Component {
  async componentWillMount(){ // to call the loadBlockchainData funcion // Allow us to call functions that happens at different ponts of time(component fn)
    await this.loadWeb3()
    await this.loadBlockchainData()
    const manager= await Car.methods.manager().call();
      this.setState({manager});
  }

  async loadWeb3(){
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum); //new connection to BLOCKCHAIN
            await window.ethereum.enable();
          }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
          }
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
  }
  async loadBlockchainData(){
    const web3=new Web3(Web3.givenProvider || "http://localhost:8545")  //Provider for metamask
    const network= await web3.eth.net.getNetworkType()
    //Fetch account from blockchain
    const accounts= await web3.eth.getAccounts()
    console.log(accounts);
    this.setState({account: accounts[0]})
    const networkId = await web3.eth.net.getId()
}


  constructor(props) {        //Special component which react knows about
    super(props)
    this.state = {
      account: '',
      loading: true,
      message:'',
      carOwner:'',
      openXCDeviceId:'',
      carModel:'',
      licencePlate:'',
      odometer:'',
      maintenanceRating:'',
      drivingBehaviorRating:'',
      //msg:'',
      //details:''
    }

    this.registerCar = this.registerCar.bind(this)
    this.updateOdometer = this.updateOdometer.bind(this)
    this.updateMaintenanceRating = this.updateMaintenanceRating.bind(this)
    this.updateDrivingRating = this.updateDrivingRating.bind(this)
    this.carVinDetails = this.carVinDetails.bind(this)

  }


registerCar(vin,openxcdeviceid,odometer,carmodel,licenceplate) {
      this.setState({ loading: true })
      Car.methods.registerCar(vin,openxcdeviceid,odometer,carmodel,licenceplate).send({ from: this.state.account })
      .once('receipt', (receipt) => {
      this.setState({ loading: false })
      })
    }

  updateOdometer(vin,odometer) {
          this.setState({ loading: true })
          Car.methods.updateOdometer(vin,odometer).send({ from: this.state.account })
          .once('receipt', (receipt) => {
          this.setState({ loading: false })
          })
        }
  updateMaintenanceRating(vin,maintRating) {
          this.setState({ loading: true })
          Car.methods.updateMaintenanceRating(vin,maintRating).send({ from: this.state.account })
          .once('receipt', (receipt) => {
          this.setState({ loading: false })
            })
          }
  updateDrivingRating(vin,driverRating) {
          this.setState({ loading: true })
          Car.methods.updateDrivingRating(vin,driverRating).send({ from: this.state.account })
          .once('receipt', (receipt) => {
          this.setState({ loading: false })
            })
          }

  async carVinDetails(vin) {
        this.setState({ loading: true })
        this.setState({message: 'Fetching Request In Progress..'})
        //const carDetail= await Car.methods.carVinDetails(vin).send({ from: this.state.account })
        const carDetail= await Car.methods.carVinDetails(vin).call()
        this.setState({ carOwner: carDetail.carOwner });
        this.setState({ openXCDeviceId: carDetail.openXCDeviceId });
        this.setState({ carModel: carDetail.carModel });
        this.setState({ licencePlate: carDetail.licencePlate });
        this.setState({ odometer: carDetail.odometer });
        this.setState({ maintenanceRating: carDetail.maintenanceRating });
        this.setState({ drivingBehaviorRating: carDetail.drivingBehaviorRating });
        this.setState({message: 'Request Processed'})
        //.once('receipt', (receipt) => {
        //this.setState({ loading: false })

        //})
        //const details = Car.methods.carVinDetails(vin).call()
        /*this.setState({
              msg:details
            })*/
            console.log(carDetail.carOwner);
            console.log(carDetail.openXCDeviceId);
            console.log(carDetail.carModel);
            console.log(carDetail.licencePlate);
            console.log(carDetail.odometer);
            console.log(carDetail.maintenanceRating);
            console.log(carDetail.drivingBehaviorRating);
            //return carDetail;
        }




  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
            <p>
            This contract is managed by {this.state.manager} account.
            </p>

              { this.state.loading
                = <Main
                  registerCar={this.registerCar}
                  updateOdometer={this.updateOdometer}
                  updateMaintenanceRating={this.updateMaintenanceRating}
                  updateDrivingRating={this.updateDrivingRating}
                  carVinDetails={this.carVinDetails}/>
                 }
                  <h5>{this.state.message}</h5>
                  <h5>Car Owner: {this.state.carOwner}, Odometer Reading: {this.state.odometer}</h5>
                  <h5>OpenXC Device: {this.state.openXCDeviceId}, Maintenance Rating: {this.state.maintenanceRating}</h5>
                  <h5>Car Model: {this.state.carModel},  Driving Behvior Rating: {this.state.drivingBehaviorRating}</h5>
                  <h5>Licence Plate: {this.state.licencePlate}</h5>

            </main >
          </div>
        </div>
      </div>
    );
  }
}

export default App;
//curly brackets to say to React that executing javascript inside html
