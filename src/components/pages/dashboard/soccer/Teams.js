import React, { useEffect, useState } from "react";
import { Form, Container, ListGroup, Pagination, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "../../../../redux/actions/soccerAction";

export default function Teams() {
  const teams = useSelector((state) => state.soccerRdcr.teams);
  const dispatch = useDispatch();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [teamsPerPage] = useState(5); // Show 5 teams per page

  useEffect(() => {
    const fetchItems = async () => {
      try {
        await dispatch(getTeams());
      } catch (error) {
        console.log(`${error}`);
      }
    };

    fetchItems();
  }, [dispatch]);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Filter teams based on search term
  const filteredTeams = teams?.filter(team =>
    team.teamName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = filteredTeams?.slice(indexOfFirstTeam, indexOfLastTeam);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render if no teams available
  if (!teams) {
    return <h3 className="text-center">LOADING....</h3>;
  }

  return (
    <>
      <Container className="mt-5 mb-5 text-center">
        <h5 style={{ fontFamily: 'Times New Roman' }}>ALL FOOTBALL TEAMS</h5>

        {/* Search Form */}
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Form className="mb-4">
              <Form.Control
                type="text"
                placeholder="Search teams by name"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Form>
          </Col>
        </Row>

        {/* Teams List */}
        <ListGroup className="mt-3">
          {currentTeams.length > 0 ? (
            currentTeams.map((team) => (
              <ListGroup.Item className="text-center" key={team._id}>
                <a href={`/single_team/${team._id}`}>{team.teamName}</a>
              </ListGroup.Item>
            ))
          ) : (
            "No teams matching your search"
          )}
        </ListGroup>

        {/* Pagination */}
        <Pagination className="justify-content-center mt-4">
          {[...Array(Math.ceil(filteredTeams?.length / teamsPerPage)).keys()].map((pageNumber) => (
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
