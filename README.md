# OlympicGamesStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

Don't forget to install your node_modules before starting (`npm install`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Project structure 

OlympicsService is the class where data is retrieved with Http GET request (the backend API is mocked by a JSON file).

ChartComponent is the component used to generate the two charts of the application (a Pie and a Bar Chart).
It takes a ChartConfig object in attribute, with an @Input tag, to inject the chart type, data and labels at component creation.

HomeComponent and CountryComponent are the the pages of the application.
They get the raw data as Observable from the service, and arrange them to initialize a ChartConfig object, in order to display the needed Chart using Property Binding in the template.

