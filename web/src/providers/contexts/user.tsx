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

    const initialUser = document.cookie !== '' ? document.cookie : null;

    const [user, setUser] = React.useState<UserSchema | null>(initialUser);

    React.useEffect(() => {
        if (user === null) {
            let cookies = document.cookie.split(';');

            // Loop through each cookie
            for (let i = 0; i < cookies.length; i++) {
                // Get cookie name
                let cookieName = cookies[i].split('=')[0].trim();
                // Set cookie with past expiry date
                document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
            }
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
