import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { theme } from "../../../stitches.config";
import logo from "../../assets/img/bolsa.png";
import { useAuth } from "../../contexts/auth";
import * as S from "./styles";

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { signOut } = useAuth();

  const navigate = useNavigate();

  return (
    <S.Container isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle className="toggle" />
        <NavbarBrand>
          <Button
            as={Link}
            to="/"
            style={{
              color: theme.colors.pallet.toString(),
              background: "none",
            }}
          >
            <img width={30} src={logo} />
            <span style={{ marginTop: 2, fontSize: 18, color: "#fff" }}>
              Sigeve Web
            </span>
          </Button>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="buttons">
        <NavbarItem>
          <Button as={Link} to="/" variant="light">
            <span style={{ color: "#fff" }}>Home</span>
          </Button>
        </NavbarItem>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light">
              <span style={{ color: "#fff" }}>Consultar</span>
            </Button>
          </DropdownTrigger>
          <DropdownMenu onAction={(key) => navigate(`/${key}`)}>
            <DropdownItem key="consult-companie">Empresas</DropdownItem>
            <DropdownItem key="consult-suppliers">Fornecedores</DropdownItem>
            <DropdownItem key="consult-units">Unidades</DropdownItem>
            <DropdownItem key="consult-products">Produtos</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light">
              <span style={{ color: "#fff" }}>Cadastrar</span>
            </Button>
          </DropdownTrigger>
          <DropdownMenu onAction={(key) => navigate(`/${key}`)}>
            <DropdownItem key="register-companie">Empresas</DropdownItem>
            <DropdownItem key="register-suppliers">Fornecedores</DropdownItem>
            <DropdownItem key="register-units">Unidades</DropdownItem>
            <DropdownItem key="register-products">Produtos</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button onPress={signOut} color="danger" variant="light">
            Desconectar
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Button
            as={Link}
            to="/"
            variant="light"
            onPress={() => setIsMenuOpen(false)}
          >
            <span style={{ color: "#fff" }}>Home</span>
          </Button>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="light">
                <span style={{ color: "#fff" }}>Consultar</span>
              </Button>
            </DropdownTrigger>
            <DropdownMenu onAction={(key) => navigate(`/${key}`)}>
              <DropdownItem
                key="consult-companie"
                onPress={() => setIsMenuOpen(false)}
              >
                Empresas
              </DropdownItem>
              <DropdownItem
                key="consult-suppliers"
                onPress={() => setIsMenuOpen(false)}
              >
                Fornecedores
              </DropdownItem>
              <DropdownItem
                key="consult-units"
                onPress={() => setIsMenuOpen(false)}
              >
                Produtos
              </DropdownItem>
              <DropdownItem
                key="consult-products"
                onPress={() => setIsMenuOpen(false)}
              >
                Unidades
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="light">
                <span style={{ color: "#fff" }}>Cadastrar</span>
              </Button>
            </DropdownTrigger>
            <DropdownMenu onAction={(key) => navigate(`/${key}`)}>
              <DropdownItem
                key="register-companie"
                onPress={() => setIsMenuOpen(false)}
              >
                Empresas
              </DropdownItem>
              <DropdownItem
                key="register-suppliers"
                onPress={() => setIsMenuOpen(false)}
              >
                Fornecedores
              </DropdownItem>
              <DropdownItem
                key="register-units"
                onPress={() => setIsMenuOpen(false)}
              >
                Produtos
              </DropdownItem>
              <DropdownItem
                key="register-products"
                onPress={() => setIsMenuOpen(false)}
              >
                Unidades
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarMenuItem>
      </NavbarMenu>
    </S.Container>
  );
}
