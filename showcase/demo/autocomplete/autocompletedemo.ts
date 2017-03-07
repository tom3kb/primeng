import {Component} from '@angular/core';
import {CountryService} from '../service/countryservice';

@Component({
    templateUrl: 'showcase/demo/autocomplete/autocompletedemo.html'
})
export class AutoCompleteDemo {

    country: any;

    countries: any[];

    filteredCountriesSingle: any[];

    filteredCountriesMultiple: any[];

    brands: string[] = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo', 'VW'];

    filteredBrands: any[];

    vehicles: Vehicle[] = [
        {
            name: 'cars',
            brands: this.brands
        },
        {
            name: 'ships',
            brands: ['Aurora', 'Lusitania', 'Schleswig Holstein', 'Titanic']
        }
        {
            name: 'trains',
            brands: ['Maglev', 'Pendolino', 'TGV', 'Shinkansen']
        }

    ];

    filteredVehicles: any[];
    brand: string;

    constructor(private countryService: CountryService) { }

    filterCountrySingle(event) {
        let query = event.query;
        this.countryService.getCountries().then(countries => {
            this.filteredCountriesSingle = this.filterCountry(query, countries);
        });
    }

    filterCountryMultiple(event) {
        let query = event.query;
        this.countryService.getCountries().then(countries => {
            this.filteredCountriesMultiple = this.filterCountry(query, countries);
        });
    }

    filterCountry(query, countries: any[]): any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        for (let i = 0; i < countries.length; i++) {
            let country = countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        return filtered;
    }

    filterBrands(event) {
        this.filteredBrands = [];
        for (let i = 0; i < this.brands.length; i++) {
            let brand = this.brands[i];
            if (brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredBrands.push(brand);
            }
        }
    }

    handleDropdownClick() {
        this.filteredBrands = [];

        //mimic remote call
        setTimeout(() => {
            this.filteredBrands = this.brands;
        }, 100)
    }

    filterVehicles(event) {
        this.filteredVehicles = [];
        for (let i = 0; i < this.vehicles.length; i++) {
            let vehicle = this.vehicles[i];
            if (vehicle.name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredVehicles.push({ name: vehicle.name, isHeader: true });
                vehicle.brands.forEach((brandValue, brandIndex) => {
                    this.filteredVehicles.push({ name: brandValue });
                });
            }
            else {
                var matchedVehicles = vehicle.brands.filter((vehicleValue, vehicleIndex) => {
                    return vehicleValue.toLocaleLowerCase().indexOf(event.query.toLowerCase()) == 0;
                });
                if (matchedVehicles.length > 0) {
                    this.filteredVehicles.push({ name: vehicle.name, isHeader: true });
                    vehicle.brands.forEach((brandValue, brandIndex) => {
                        this.filteredVehicles.push({ name: brandValue });
                    });
                }
            }
        }
    }

    handleDropdownVehiclesClick() {
        this.filteredVehicles = [];

        //mimic remote call
        setTimeout(() => {
            debugger;
            this.vehicles.forEach((vehicle, idx) => {
                this.filteredVehicles.push({ name: vehicle.name, isHeader: true });
                vehicle.brands.forEach((brandValue, brandIndex) => {
                    this.filteredVehicles.push({ name: brandValue });
                });
                debugger;
            });
        }, 100)
    }


    checkOptionIsHeader(option: any) {
        return option.isHeader;

    }
}

export class Vehicle {
    public name: string;
    public brands: string[];
}