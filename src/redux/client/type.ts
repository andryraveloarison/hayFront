import { UserInterface } from "../../types/UserInterface";



export interface UserState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    clientReceiver: UserInterface | null;
    clientSender: UserInterface | null;
    clients: UserInterface[] 
}

