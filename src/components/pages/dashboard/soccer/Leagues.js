import React, { useEffect, useState } from "react";
import { Form, Container, ListGroup, Pagination, Row, Col } from "react-bootstrap";
import { fetchAllLeagues } from "../../../../helpers/articlesHelpers/LeaguesFetch";

export default function Leagues() {
  const [leagues, setLeagues] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [teamsPerPage] = useState(5); // Show 5 teams per page

  useEffect(() => {
    const fetchItems = async () => {
      try {
       const data = await fetchAllLeagues()

       if(data && !data.error) {
        setLeagues(data?.leagues)
       }
      } catch (error) {
        console.log(`${error}`);
      }
    };

    fetchItems();
  }, []);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Filter teams based on search term
  const filteredLeagues = leagues?.filter(league =>
    league.leagueName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentLeagues = filteredLeagues?.slice(indexOfFirstTeam, indexOfLastTeam);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render if no teams available
  if (!leagues) {
    return <h3 className="text-center">LOADING....</h3>;
  }

  return (
    <>
      <Container className="mt-5 mb-5 text-center">
        <h5 style={{ fontFamily: 'Times New Roman' }}>ALL FOOTBALL LEAGUES</h5>

        {/* Search Form */}
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Form className="mb-4">
              <Form.Control
                type="text"
                placeholder="Search leagues by name"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Form>
          </Col>
        </Row>

        
        <ListGroup className="mt-3">
          {currentLeagues.length > 0 ? (
            currentLeagues.map((league) => (
              <ListGroup.Item className="text-center" key={league._id}>
                <a href={`/single_league/${league._id}`}>{league.leagueName}</a>
              </ListGroup.Item>
            ))
          ) : (
            "No teams matching your search"
          )}
        </ListGroup>

        {/* Pagination */}
        <Pagination className="justify-content-center mt-4">
          {[...Array(Math.ceil(filteredLeagues?.length / teamsPerPage)).keys()].map((pageNumber) => (
            <Pagination.Item
              key={pageNumber + 1}
              active={pageNumber + 1 === currentPage}
              onClick={() => paginate(pageNumber + 1)}
            >
              {pageNumber + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>
    </>
  );
}
