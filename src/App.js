import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import Main from "./pages/Main";

function App() {
  return (
    <div>
      <Navbar expand={false} style={{ background: "blue" }}>
        <Container fluid>
          <Navbar.Brand className="fw-bold" style={{color: "white"}} href="/home">Matemática Discreta e Computacional</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="end"
          >
            <Offcanvas.Header style={{ background: "blue" }} closeButton>
              <Offcanvas.Title className="fw-bold" style={{color: "white"}} id={`offcanvasNavbarLabel-expand-${false}`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/grouping">Agrupamento</Nav.Link>
                <Nav.Link href="/function-graph">Gráfico de Funções</Nav.Link>
                <Nav.Link href="/data-table">Tabela com Estrutura de Dados</Nav.Link>
                <Nav.Link href="/file-explorer">Arvore Dinâmica</Nav.Link>
                <Nav.Link href="/charts">Gráficos Diversos</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <div>
        <Main />
      </div>
    </div>
  );
}

export default App;
