const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

//const compiledFactory = require('../ethereum/build/CarFactory.json');
const compiledCar = require('../ethereum/build/Car.json');

let accounts;
//let factory;
//let carAdress;
let car;

beforeEach(async () =>{
  //Get a list of all unlocked accounts
  /*web3.eth.getAccounts()
    .then(fetchedAccounts=> {
      console.log(fetchedAccounts);
    });*/
  accounts = await web3.eth.getAccounts();
  // Use one of those accounts to deploy the contract
  car = await new web3.eth.Contract(JSON.parse(compiledCar.interface))
    .deploy({ data: compiledCar.bytecode, arguments:['contract 1'] })
    .send({from: accounts[0], gas:'1000000'});

    /*await factory.methods.createCar('100').send({
      from: accounts[0],
      gas:'3000000'
    });

    [carAddress]= await factory.methods.getDeployedCars().call();*/
    /*car = await new web3.eth.Contract(
      JSON.parse(compiledCar.interface)
    );*/
});

describe('Car',() => {

  it('deployes a car',() => {
    //assert.ok(factory.options.address);
    assert.ok(car.options.address);
  });

  it('marks manager of contract', async () => {
    const manager = await car.methods.manager().call();
    assert.equal(accounts[0],manager);
  });

  it('allows people to register car and marks them as car owners' , async () =>{
    await car.methods
      .registerCar(1,'1','Accord','7PCC228',2000)
      .send({
      from: accounts[1],
      gas:'3000000'
    });
    const cardetail = await car.methods.carVinDetails(1).call();
      assert.equal(accounts[1],cardetail.carOwner);
  });

  it('check if car details are updated',async() =>{
      await car.methods.registerCar(1,'1','Accord','7PCC228',2000).send({
        from: accounts[1],
        gas:'3000000'
      });
      const cardetail = await car.methods.carVinDetails(1).call();
      assert.equal(cardetail.odometer , 2000);
      assert.equal(cardetail.carModel , 'Accord');
      assert.equal(cardetail.drivingBehaviorRating , 0);
      assert.equal(cardetail.maintenanceRating , 0);
      assert.equal(cardetail.openXCDeviceId , '1');
      assert.equal(cardetail.licencePlate , '7PCC228');
  });

  it('Update Odometer',async() =>{
      await car.methods.registerCar(1,'1','Accord','7PCC228',2000).send({
        from: accounts[1],
        gas:'3000000'
      });
      await car.methods.updateOdometer(1,2001).send({
        from: accounts[0],
        gas:'3000000'
      });
      const cardetail = await car.methods.carVinDetails(1).call();
      assert.equal(cardetail.odometer , 2001);
  });

  it('Update Maintenance record',async() =>{
      await car.methods.registerCar(1,'1','Accord','7PCC228',2000).send({
        from: accounts[1],
        gas:'3000000'
      });
      await car.methods.updateMaintenanceRating(1,10).send({
        from: accounts[0],
        gas:'3000000'
      });

      await car.methods.updateMaintenanceRating(1,8).send({
        from: accounts[0],
        gas:'3000000'
      });
      const cardetail = await car.methods.carVinDetails(1).call();
      assert.equal(cardetail.maintenanceRating ,(8+10)/2);
  });

  it('Update driving behavior rating',async() =>{
      await car.methods.registerCar(1,'1','Accord','7PCC228',2000).send({
        from: accounts[1],
        gas:'3000000'
      });
      await car.methods.updateDrivingRating(1,10).send({
        from: accounts[0],
        gas:'3000000'
      });
      await car.methods.updateDrivingRating(1,5).send({
        from: accounts[0],
        gas:'3000000'
      });
      const cardetail = await car.methods.carVinDetails(1).call();
      assert.equal(cardetail.drivingBehaviorRating , parseInt((10+5)/2), 10);
  });
});
