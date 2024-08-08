import React from 'react'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion } from 'framer-motion';
import { genreView } from '../../../redux/actions/magazineAction';




export default function ArticlesGenreView() {
    const dispatch = useDispatch()

    const genres = useSelector((state) => state.magRdcr.genres)

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

                await dispatch(genreView())
                
            } catch (error) {
                console.error("there was a problem")
            }


        }

        fetchData()


    }, [dispatch])


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

<motion.div >
    <ul className="list-group">
          {genres?.map((category, index) => (
            <motion.li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center mb-2"
            variants={categoryVariants}
          >
         <a href={`/genre_single/${category._id}`}>{category.genreName}</a>   

          
            
          </motion.li>
            
          ))}
        </ul>

    
    
    </motion.div>
    



    </>
  )
}
