import React, { useState, useEffect } from "react";
import {
    CountryObj,
    RegionObj,
    OverallLocationObj,
} from "../models/apiInterfaces";
import { getUserLocation, getWeather } from "../api/locationweather";

const CitiesList = () => {

    const [countryObjectList, setCountryObjectList] = useState<CountryObj[]>(
        []
    );
    const [regionObjectList, setRegionObjectList] = useState<RegionObj[]>([]);
    const [cityObjectList, setCityObjectList] = useState<OverallLocationObj[]>(
        []
    );

    const [country, setCountry] = useState<string>("");
    const [region, setRegion] = useState<string>("");
    const [city, setCity] = useState<string>("");

    const [locationObj, setLocationObj] = useState<OverallLocationObj>({
        city: "",
        country: "",
        region: "",
        latitude: "",
        longitude: "",
    });

    useEffect(() => {
        getUserLocation({
            setCountry,
            setRegion,
            setCity,
            setLocationObj,
            setCountryObjectList,
            setRegionObjectList,
            setCityObjectList,
        });
        console.log(countryObjectList, regionObjectList, cityObjectList)
    }, []);

    const handleCityForm = (e: React.FormEvent): void => {
        e.preventDefault();
        getWeather(locationObj.latitude, locationObj.longitude);
    };

    return (
        <div>
            <form name="cityForm" onSubmit={(e) => handleCityForm(e)}>
                <label htmlFor="countryName">Enter Country Name</label>
                <input type="text" id="countryName" defaultValue={country} />

                <label htmlFor="regionName">Enter Region Name</label>
                <input type="text" id="regionName" defaultValue={region} />

                <label htmlFor="cityName">Enter City Name</label>
                <input type="text" id="cityName" defaultValue={city} />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CitiesList;
