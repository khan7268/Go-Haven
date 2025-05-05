import axios from "axios";
import { createContext, useEffect, useState } from "react";

const UserContext=createContext({});

export function UserContextProvider({children}) {
    // const [user,setUser]=useState(null);
    // useEffect(() => {
    //    if(!user) {
    //     axios.get('/profile').then(({data})=> {
    //         setUser(data);
    //     });
    //    }
    // },[]);

    const [user, setUser] = useState(null);
    const [ready,setReady] = useState(false);

useEffect(() => {
  axios
    .get("/profile", { withCredentials: true }) // Ensure credentials are included
    .then(({ data }) => {
      if (data) {
        setUser(data); // Store user data
      }
      setReady(true);
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
      setUser(null); // Ensure state remains consistent
    });
}, []); 
    return (
        <UserContext.Provider value={{user,setUser,ready}}>
                 {children}
        </UserContext.Provider>
    )
}
export default UserContext;
