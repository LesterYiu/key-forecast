// API Call Interfaces

export interface CountryObj {
    name: string;
    code: string;
}

export interface RegionObj {
    region: string;
    country: string;
}

export interface OverallLocationObj {
    city: string;
    country: string;
    region: string;
    latitude: string;
    longitude: string;
}

export interface DropdownAndFormStates {
    setCountry: React.Dispatch<React.SetStateAction<string>>;
    setRegion: React.Dispatch<React.SetStateAction<string>>;
    setCity: React.Dispatch<React.SetStateAction<string>>;
    setLocationObj: React.Dispatch<
        React.SetStateAction<OverallLocationObj>
    >;
    setCountryObjectList: React.Dispatch<
        React.SetStateAction<CountryObj[]>
    >;
    setRegionObjectList: React.Dispatch<React.SetStateAction<RegionObj[]>>;
    setCityObjectList: React.Dispatch<
        React.SetStateAction<OverallLocationObj[]>
    >;
}

// API Response Interfaces

export interface AuthObject {
    currentUser: {
        isAnonymous: {},
        uid: string
    };
}

export interface AuthReturnObject {
    user: {
        displayName: string
    }
}