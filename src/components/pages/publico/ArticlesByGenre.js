import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ByGenreArticles } from '../../../redux/actions/magazineAction'
import { Container } from 'react-bootstrap'
import { publicGetGenre } from '../../../redux/actions/publicAction'

export default function ArticlesByGenre() {
    const{id} = useParams()
    const dispatch = useDispatch()
    const articlesByGenre = useSelector((state) => state.magRdcr.articlesByGenre)
    const category = useSelector((state) => state.publicRdcr.category)
    
    
    useEffect(() => {

        const fetchData = async() => {

            try {

                await dispatch(ByGenreArticles(id))
                
            } catch (error) {
                console.error("there was a problem")
            }


        }

        fetchData()



    }, [dispatch, id])


   
  useEffect(() => {

    const fetchCat = async() => {

        try {

            await dispatch(publicGetGenre(id))
            
        } catch (error) {
            console.error("there was a problem")
        }


    }

    fetchCat()



  }, [dispatch, id])  


    if(!articlesByGenre || !category) {
        return ""
    }




  return (
    <Container className='mt-3'>
    <div className="widget">
          <h5 className="widget-title"><span>Articles from the {category.genreName} category </span></h5>
          <ul className="list-unstyled widget-list">

          {
                        articlesByGenre?.map((item) => (
                            <li key={item._id}><a className="d-flex" href={`/post-details/${item._id}`}>{item.articleTitle}</a></li>

                        ))
                    }
          </ul>
        </div>
    



    </Container>
  )
}



