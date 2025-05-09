import Axios from "../../service/Axios";
import { dataMessageInterface } from "../../types/MessageInterface";



export const fetchMsgBySenderAndReceiver = async (senderId: string, receiverId: string) => {
    const response = await Axios.get(`api/message/${senderId}/${receiverId}`)
    
    if (!response.data) throw new Error("Erreur lors du chargement des message");
    return await response.data;
};


export const fetchSendMessage = async (dataMessageInterface: dataMessageInterface) => {
    const response = await Axios.post(`api/message/send`, {
        senderId: dataMessageInterface.senderId,
        receiverId: dataMessageInterface.receiverId,
        content: dataMessageInterface.content
    });
    console.log("response : ",response.data);
    
    
    if (!response.data) throw new Error("Erreur lors du chargement des message");
    return await response.data;
};