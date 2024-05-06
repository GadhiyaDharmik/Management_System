import React from "react";
import { Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { Link } from "react-router-dom";

const PagesTimeline = () => {
  const statuses = [
    {
      id: 1,
      date: "03 May",
      title: "Timeline event One",
      description:
        "If several languages coalesce, the grammar of the resulting the individual",
    },
    {
      id: 2,
      date: "08 May",
      title: "Timeline event Two",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit illo inventore veritatis",
    },
    {
      id: 3,
      date: "11 May",
      title: "Timeline event Three",
      description:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit",
    },
    {
      id: 4,
      date: "16 May",
      title: "Timeline event Four",
      description:
        "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam",
    },
    {
      id: 5,
      date: "23 May",
      title: "Timeline event Five",
      description:
        "Itaque earum rerum hic tenetur a sapiente delectus maiores alias consequatur aut",
    },
  ];
  //Owl Carousel Settings
  const options = {
    margin: 10,
    responsiveClass: true,
    nav: false,
    dots: false,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      576: {
        items: 2,
      },

      768: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Utility" breadcrumbItem="Timeline" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Horizontal Timeline</CardTitle>

                  <div className="hori-timeline">
                    <OwlCarousel
                      className="owl-carousel owl-theme navs-carousel events"
                      {...options}
                    >
                      {statuses.map((itemDetails, id) => (
                        <div className="item event-list" key={id}>
                          <div className="event-date">
                            <div className="text-primary">
                              {itemDetails.date}
                            </div>
                          </div>

                          <div className="px-3">
                            <h5>{itemDetails.title}</h5>
                            <p className="text-muted">
                              {itemDetails.description}
                            </p>
                            <div>
                              <Link to="/">
                                View more{" "}
                                <i className="uil uil-arrow-right"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </OwlCarousel>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-5 h4">Vertical Timeline</CardTitle>
                  <div className="">
                    <ul className="verti-timeline list-unstyled">
                      {/* Render Horizontal Timeline Events */}
                      {statuses.map((status, key) => (
                        <li key={key} className="event-list">
                          <div className="event-date text-primar">{status.date}</div>
                          <h5>{status.title}</h5>
                          <p className="text-muted">{status.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default PagesTimeline;
