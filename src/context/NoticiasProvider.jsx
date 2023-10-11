import axios from "axios"
import { useEffect,useState,createContext } from "react"

    const NoticiasContext = createContext()


    const NoticiasProvider = ({children}) => {


        const[categoria,setCategoria] = useState('general')

        const [noticias,setNoticias] = useState({})

        useEffect(() => {

            const consultarAPI = async () =>{
                const url = `https://newsapi.org/v2/top-headlines?country=us&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`

                
                const {data} = await axios(url)

                console.log(url)
                setNoticias(data.articles)
                console.log(noticias)
                
            }
            consultarAPI()
        },[categoria])

        const handleChangeCategoria = e => {
            setCategoria(e.target.value)
        }

        return(

            <NoticiasContext.Provider
                value={{
                    categoria,
                    handleChangeCategoria,
                    noticias

                }}
            >
                {children}
            </NoticiasContext.Provider>
        )
    }

    export {
        NoticiasProvider
    }

    export default NoticiasContext