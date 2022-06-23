interface Vehicle {
    name: string;
    year: Date;
    broken: boolean;

    summary(): string;
}

const newMazda: Vehicle = {
    name: 'mazda',
    year: new Date(),
    broken: false,
    summary(): string {
        return `Name: ${this.name}`
    }
}

const printVehicle = (vehicle: Vehicle): void => {
    console.log(`Name: ${vehicle.name}`);
    console.log(`Year: ${vehicle.year}`);
    console.log(`Broken: ${vehicle.broken}`);
    console.log(vehicle.summary());
};

printVehicle(newMazda);


