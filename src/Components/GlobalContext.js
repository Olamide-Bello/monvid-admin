import { createContext, useEffect, useMemo, useRef, useState } from "react";
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const GlobalContext = createContext({
    searchParam: "",
    searchValue: "",
    searchMatch: true,
    searchResult: [],
    allProducts: [],
    handleCategory: () => { },
    category: "",
    deleteItem: () => { },
    handleQty: () => { },
    logUser: () => { },
    user: {},
    handleUser: () => { },
})

function GlobalState({ children }) {
    const [searchParam, setSearchParam] = useState("")
    // const [allProducts, setAllProducts] = useState([])
    const [searchResult, setSearchResult] = useState([])
    const [searchMatch, setSearchMatch] = useState(true)
    const [category, setCategory] = useState("")
    const searchValue = useRef("")
    const [token, setToken] = useState(
        () => {
            const savedSession = localStorage.getItem("admin-token");
            if (savedSession) {
                return savedSession;
            } else {
                return "";
            }
        }
    )
    const [user, setUser] = useState(
        () => {
            const savedUser = localStorage.getItem("admin");
            if (savedUser) {
                return JSON.parse(savedUser);
            } else {
                return {};
            }
        }
    )
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )

    const handleChange = async (e) => {
        searchValue.current = e.target.value
        setSearchParam(searchValue.current)
    }

    const handleCategory = (e) => {
        setCategory(e.target.name)
    }

    // const deleteItem = (e) => {
    //     let copy = cart.filter((product) => {
    //         return product.id !== +e.currentTarget.id
    //     })
    //     setCart(copy)
    //     toast.info("item removed from cart successfully!")
    // }

    const logUser = (newToken) => {
        setToken(newToken)
    }

    const handleUser = (userData) => {
        console.log(userData)
        setUser(userData)
    }

    useEffect(() => {
        window
            .matchMedia("(min-width: 768px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);
    useEffect(() => {
        localStorage.setItem("admin-token", token);
    }, [token])
    useEffect(() => {
        localStorage.setItem("admin", JSON.stringify(user));
    }, [user])
    useMemo(()=> {
        if (searchParam === "") {
            setSearchResult([])
            setSearchMatch(true)
        }
    }, [searchParam])
    useEffect(() => {
        (async () => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Access-Control-Allow-Origin", "http://localhost:3001");
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
                mode: 'cors'
            };
            if (searchParam) {
                const response = await fetch(`http://localhost:3000/item/search/${searchParam}`, requestOptions)
                if (response.status === 200) {
                    const result = await response.json()
                    setSearchResult(result)
                    setSearchMatch(true)
                    console.log(result)
                } else if (response.status === 404) {
                    setSearchMatch(false)
                    setSearchResult([])
                }
            
            }
            if (searchParam === "") {
                setSearchResult([])
            }
            
        })
        ()
    }, [searchParam])


    const contextValue = {
        searchParam,
        searchValue,
        searchResult,
        searchMatch,
        handleChange,
        matches,
        // allProducts,
        handleCategory,
        category,
        // deleteItem,
        // handleQty,
        logUser,
        user,
        handleUser,
    }
    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalState