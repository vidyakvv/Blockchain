pragma solidity ^0.4.17;

/*contract CarFactory{
    address[] public deployedCar; // address of deployed car contract

    function createCar(uint8 minimum) public{
        address newCar = new Car(minimum, msg.sender);
        deployedCar.push(newCar);
    }
    function getDeployedCars() public view returns(address[]){
        return deployedCar;
    }
}*/

contract Car{

    struct CarDetails{
        address carOwner;
        string openXCDeviceId;
        string carModel;
        string licencePlate;
        uint odometer;
        uint8 maintenanceRating;
        uint8 drivingBehaviorRating;
    }
    mapping(uint8 => CarDetails) public carVinDetails;

    address public manager;
    string public contractName;
    //uint8 VinKey;

    function Car(string name) public{
         manager = msg.sender;
         contractName = name;
    }
   //CarDetails GetCarDetail;

    function registerCar(uint8 vin, string openXCDeviceId, string carModel, string licencePlate, uint odometer)
    public{
        require(carVinDetails[vin].carOwner == 0x00);
        require(msg.sender != manager);

        CarDetails memory newCarDetails = CarDetails({
            carOwner : msg.sender,
            openXCDeviceId : openXCDeviceId,
            carModel : carModel,
            licencePlate : licencePlate,
            odometer : odometer,
            maintenanceRating : 0,
            drivingBehaviorRating : 0
        });

        carVinDetails[vin] = newCarDetails; // Adding entry to mapping
    }

    /*function getCarDetails(uint8 vin) public view returns(CarDetails){
        require(carVinDetails[vin].carOwner == msg.sender);
        return carVinDetails[vin];
    }*/

    function updateOdometer(uint8 vin, uint odometer) public {
        CarDetails storage cardetail = carVinDetails[vin];
        require(msg.sender == manager);
        require(cardetail.odometer < odometer);
        cardetail.odometer = odometer;
    }
    function updateDrivingRating(uint8 vin, uint8 driveRating) public {
        CarDetails storage cardetail = carVinDetails[vin];
        require(msg.sender == manager);
        if(cardetail.drivingBehaviorRating==0){
            cardetail.drivingBehaviorRating = driveRating;
        }
        else{
            cardetail.drivingBehaviorRating = (cardetail.drivingBehaviorRating+driveRating)/2;
        }
    }
    function updateMaintenanceRating(uint8 vin, uint8 maintRating) public {
        CarDetails storage cardetail = carVinDetails[vin];
        require(msg.sender == manager);

        if(cardetail.maintenanceRating==0){
            cardetail.maintenanceRating = maintRating;
        }
        else{
            cardetail.maintenanceRating  = (cardetail.maintenanceRating+maintRating)/2;
        }
    }

}
