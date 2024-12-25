import axios from "axios";

const getData = async () => {
    const url = "https://localhost:7092/api/Tasks/All";
    try {
        const response = await axios.get(url);
        return response.data
            .map(data => {
                return {
                    id: data.id,
                    name: data.name,
                    isComplete: data.isComplete
                }
            });
    }
    catch (error) {
        console.error("Error fetching data: " + error);
        return [];
    }
};

const postData = async (task) =>{
    const url = "https://localhost:7092/api/Tasks/Add";
    try{
        const response = await axios.post(url, task);
        if (response.status === 201 || response.status === 200 || response.status === 204) {
            console.log("Task added successfully");
            return true;
        } else {
            console.warn("Unexpected response status:", response.status);
            return false;
        }
    }
    catch (error){
        console.error("Error fetching data: " + error);
        return false;
    }
};

const markAsComplete = async (id) => {
    const url = `https://localhost:7092/api/Tasks/MarkAsComplete/${id}`;
    try {
        const response = await axios.put(url);
        if (response.status === 201 || response.status === 200 || response.status === 204) {
            console.log("Task updated successfully");
            return true;
        } else {
            console.warn("Unexpected response status:", response.status);
            return false;
        }
    } catch (error) {
        console.error("Error fetching data: " + error);
        return false;
    }
};



export {getData , postData, markAsComplete};