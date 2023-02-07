export interface SignUpProps {
    setUserUID: React.Dispatch<React.SetStateAction<string>>;
    userUID: string;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
    isAuth: boolean;
}