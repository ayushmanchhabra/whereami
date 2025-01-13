import React from 'react';

import { UserSchema } from 'providers/schema';

const UserContext = React.createContext<{
    user: UserSchema | null,
    setUser: React.Dispatch<React.SetStateAction<UserSchema | null>>
}>({
    user: null,
    setUser: () => { },
});

interface UserProviderProps {
    children: JSX.Element | JSX.Element[],
}

function UserProvider({ children }: UserProviderProps): JSX.Element {

    const initialUser = JSON.parse(localStorage.getItem('auth') as string);

    const [user, setUser] = React.useState<UserSchema | null>(initialUser);

    React.useEffect(() => {
        if (user === null) {
            localStorage.clear();
        } else {
            localStorage.setItem('auth', JSON.stringify(user));
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export {
    UserContext,
    UserProvider,
    type UserProviderProps,
};
