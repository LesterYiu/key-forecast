import {weatherAPIKey, locationAPIKey, geocodingAPIKey} from "../config/apikeys";
import axios from "axios";
import {DropdownAndFormStates} from "../models/ApiInterfaces";

export const getUserLocation = (setStateObj: DropdownAndFormStates) => {
    const {
        setCountry,
        setRegion,
        setCity,
        setLocationObj,
        setCountryObjectList,
        setRegionObjectList,
        setCityObjectList,
    } = setStateObj;

    navigator.geolocation.getCurrentPosition(
        async function (position) {
            const response = await axios.get(
                `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=${geocodingAPIKey}`
            );
            const { country, state, city, country_code, lat, lon } =
                response.data.results[0];
            setCountry(country);
            setRegion(state);
            setCity(city);
            setLocationObj({
                city,
                country: country_code,
                region: state,
                latitude: lat,
                longitude: lon,
            });
        },
        function () {
            populateDropdown(
                {setCountryObjectList,
                setCountry,
                setRegionObjectList,
                setRegion,
                setCityObjectList,
                setLocationObj,
                setCity}
            );
        }
    );
};

export const getWeather = async (latitude: string, longitude: string) => {
    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAPIKey}&units=metric`
    );
    console.log(response.data);
};

const populateDropdown = async (setStateObj: DropdownAndFormStates) => {

    const {
        setCountry,
        setRegion,
        setCity,
        setLocationObj,
        setCountryObjectList,
        setRegionObjectList,
        setCityObjectList,
    } = setStateObj;

    // Handles Country List Dropdown
    const countryListResponse = await axios.get(
        `https://radiant-peak-12085.herokuapp.com/http://battuta.medunes.net/api/country/all/?key=${locationAPIKey}`
    );
    setCountryObjectList(countryListResponse.data);
    setCountry(countryListResponse.data[0].name);

    // Handles Region List Dropdown
    const regionListResponse = await axios.get(
        `https://radiant-peak-12085.herokuapp.com/http://battuta.medunes.net/api/region/${countryListResponse.data[0].code}/all/?key=${locationAPIKey}`
    );
    setRegionObjectList(regionListResponse.data);
    const { region, country } = regionListResponse.data[0];
    setRegion(region);

    // Handles City List Dropdown
    const cityListResponse = await axios.get(
        `https://radiant-peak-12085.herokuapp.com/http://battuta.medunes.net/api/city/${country}/search/?region=${region}&key=${locationAPIKey}`
    );
    setCityObjectList(cityListResponse.data);
    setLocationObj(cityListResponse.data[0]);
    setCity(cityListResponse.data[0].city);
};