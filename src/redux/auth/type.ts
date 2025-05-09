

export interface AuthState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    token: string | null;
    success: boolean;
}

