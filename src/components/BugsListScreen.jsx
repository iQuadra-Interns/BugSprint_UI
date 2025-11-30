import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SideBar from "./Sidebar";
import Controls from "./Controls";
import BugList from "./Bugslist";

function BugsListScreen() {
  const [filters, setFilters] = useState({});

  const applyFilters = (selectedFilters) => {
    // merge incoming filters with existing ones so Controls and Filter modal can cooperate
    setFilters((prev) => ({ ...(prev || {}), ...(selectedFilters || {}) }));
  };

  return (
    <Container fluid className="mainContainer">
      <Row className="h-100">
        <Col xs={12} md="auto" className="p-0 sidebar-container">
          <SideBar />
        </Col>
        <Col xs={12} md className="content-container">
          <div className="controls-container">
            <Controls applyFilters={applyFilters} />
          </div>
          <div className="buglist-container" style={{ height: "80vh", overflowY: "auto" }}>
            <BugList filters={filters} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default BugsListScreen;
