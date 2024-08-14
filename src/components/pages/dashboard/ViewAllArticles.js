import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { articlesAll } from '../../../redux/actions/magazineAction'
import { bmagtoken } from '../../../helpers/Bmag'

export default function ViewAllArticles() {
    const dispatch = useDispatch()
    const articles = useSelector((state) => state.magRdcr.articles)

    useEffect(() => {


        const fetchArticles = async() => {

            try {
                await dispatch(articlesAll())
                
            } catch (error) {
                console.error("there was a problem")
            }


        }

        fetchArticles()



    }, [dispatch])


    if(!articles) {
        return ""
    }


    if(!bmagtoken || bmagtoken === undefined || bmagtoken === null) {

        return ""
    }

  return (
    <>

<div className="widget mt-4 text-center">
          <h5 className="widget-title"><span>All Articles</span></h5>
          <ul className="list-unstyled widget-list text-center">

          {
                        articles?.map((item) => (
                            <li key={item._id}><a className="d-flex text-center" href={`/article_single/${item._id}`}>{item.articleTitle}</a></li>

                        ))
                    }
          </ul>
        </div>
         
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
    
    
    
    </>
  )
}
