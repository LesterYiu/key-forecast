import {weatherAPIKey, locationAPIKey, geocodingAPIKey} from "../config/apikeys";
import axios from "axios";
import { OverallLocationObj, CountryObj, RegionObj} from "../models/interfaces";

export const getUserLocation = (
    setCountryFunc: React.Dispatch<React.SetStateAction<string>>,
    setRegionFunc: React.Dispatch<React.SetStateAction<string>>,
    setCityFunc: React.Dispatch<React.SetStateAction<string>>,
    setLocationObjFunc: React.Dispatch<React.SetStateAction<OverallLocationObj>>,
    setCountryObjectListFunc: React.Dispatch<React.SetStateAction<CountryObj[]>>,
    setRegionObjectListFunc: React.Dispatch<React.SetStateAction<RegionObj[]>>,
    setCityObjectListFunc: React.Dispatch<React.SetStateAction<OverallLocationObj[]>>
) => {
    navigator.geolocation.getCurrentPosition(
        async function (position) {
            const response = await axios.get(
                `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=${geocodingAPIKey}`
            );
            const { country, state, city, country_code, lat, lon } =
                response.data.results[0];
            setCountryFunc(country);
            setRegionFunc(state);
            setCityFunc(city);
            setLocationObjFunc({
                city,
                country: country_code,
                region: state,
                latitude: lat,
                longitude: lon,
            });
        },
        function () {
            populateDropdown(setCountryObjectListFunc, setCountryFunc, setRegionObjectListFunc, setRegionFunc, setCityObjectListFunc, setLocationObjFunc, setCityFunc)
        }
    );
};

export const getWeather = async (latitude: string, longitude: string) => {
    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAPIKey}&units=metric`
    );
    console.log(response.data);
};

const populateDropdown = async (
    setCountryObjectListFunc: React.Dispatch<React.SetStateAction<CountryObj[]>>,
    setCountryFunc: React.Dispatch<React.SetStateAction<string>>,
    setRegionObjectListFunc: React.Dispatch<React.SetStateAction<RegionObj[]>>,
    setRegionFunc: React.Dispatch<React.SetStateAction<string>>,
    setCityObjectListFunc: React.Dispatch<React.SetStateAction<OverallLocationObj[]>>,
    setLocationObjFunc: React.Dispatch<React.SetStateAction<OverallLocationObj>>,
    setCityFunc: React.Dispatch<React.SetStateAction<string>>
) => {
    // Handles Country List Dropdown
    const countryListResponse = await axios.get(
        `https://radiant-peak-12085.herokuapp.com/http://battuta.medunes.net/api/country/all/?key=${locationAPIKey}`
    );
    setCountryObjectListFunc(countryListResponse.data);
    setCountryFunc(countryListResponse.data[0].name);

    // Handles Region List Dropdown
    const regionListResponse = await axios.get(
        `https://radiant-peak-12085.herokuapp.com/http://battuta.medunes.net/api/region/${countryListResponse.data[0].code}/all/?key=${locationAPIKey}`
    );
    setRegionObjectListFunc(regionListResponse.data);
    const { region, country } = regionListResponse.data[0];
    setRegionFunc(region);

    // Handles City List Dropdown
    const cityListResponse = await axios.get(
        `https://radiant-peak-12085.herokuapp.com/http://battuta.medunes.net/api/city/${country}/search/?region=${region}&key=${locationAPIKey}`
    );
    setCityObjectListFunc(cityListResponse.data);
    setLocationObjFunc(cityListResponse.data[0]);
    setCityFunc(cityListResponse.data[0].city);
};