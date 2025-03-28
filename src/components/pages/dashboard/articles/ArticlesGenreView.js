import React from 'react'
import { useEffect, useState } from "react"
import { motion } from 'framer-motion';
import { fetchAllCategories } from '../../../../helpers/articlesHelpers/CategoriesFetch';




export default function ArticlesGenreView() {
    
    const [genres, setGenres] = useState([])

    const categoryVariants = {
        hidden: {
          opacity: 0,
          y: 50,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: 0.2,
          },
        },
      };
    

    useEffect(() => {

        const fetchData = async() => {


            try {

               const data = await fetchAllCategories()

               if(data && !data.error) {
                setGenres(data?.categories)
               }
                
            } catch (error) {
                console.error("there was a problem")
            }


        }

        fetchData()


    }, [])


    if(!genres || genres === undefined || genres === null) {

        return(<>

        <h6 className="text-center" style={{marginTop: "2rem"}}>book genres are loading</h6>
        
        
        </>)
    }  if(genres && genres.length === 0) {

        return(<>

        <h6 className="text-center" style={{marginTop: "2rem"}}>there are no book genres at the momemnt; please <a href="/genres_create">create some</a> </h6>
        
        
        </>)
    }



  return (
    <>

<motion.div style={{marginTop: "3rem", marginBottom: "5rem"}} >
    <ul className="list-group">
          {genres?.map((category, index) => (
            <motion.li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center mb-2"
            variants={categoryVariants}
          >
         <a href={`/article_by_genre/${category._id}`}>{category.genreName}</a>   || EDIT Category

          
            
          </motion.li>
            
          ))}
        </ul>

    
    
    </motion.div>
    



    </>
  )
}
