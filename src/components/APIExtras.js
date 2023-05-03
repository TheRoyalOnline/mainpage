
const URI_ValidateUsername = "http://royalonline.cloud/api/validateusername";
const URI_Countries = "http://royalonline.cloud/api/countries";
const URI_Cities = "http://royalonline.cloud/api/cities";
const URI_Rooms = "http://royalonline.cloud/api/rooms";

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