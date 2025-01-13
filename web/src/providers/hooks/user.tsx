import React from 'react';

import { UserContext, UserProvider } from 'providers/contexts';
import { UserSchema } from 'providers/schema';

function useUser () {

    const userContext = React.useContext<{
        user: UserSchema | null;
        setUser: React.Dispatch<React.SetStateAction<UserSchema | null>>;
    }>(UserContext);

    return {
        user: userContext.user,
        setUser: userContext.setUser,
        UserProvider: UserProvider,
    };
}

export default useUser;
