
const URI_ValidateUsername = "https://royalonline.cloud/api/validateusername";
const URI_Countries = "https://royalonline.cloud/api/countries";
const URI_Cities = "https://royalonline.cloud/api/cities";
const URI_Rooms = "https://royalonline.cloud/api/rooms";
const URI_Global = "https://royalonline.cloud/api/global";

export const ValidateUserName = async (user) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user })
    };

    const res = await fetch(URI_ValidateUsername, requestOptions);

    if (res.status === 200) {
        var exist = await res.json();
        return exist['exists'];
    }
};

export const GetCountries = async () => {
    const res = await fetch(URI_Countries);

    if (res.status === 200) {        
        return await res.json();
    }

};

export const GetCities = async () => {
    const res = await fetch(URI_Cities);

    if (res.status === 200) {        
        return await res.json();
    }

};


export const GetRooms = async () => {
    const res = await fetch(URI_Rooms);

    if (res.status === 200) {        
        return await res.json();
    }

};

export const GetGlobal = async (_key) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            key: _key
        })
    };
    const res = await fetch(URI_Global, requestOptions);
    return await res.text();
};