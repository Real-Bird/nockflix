import styled from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
  z-index: 1000;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 30px;
  width: 125px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  transform: scale(1.5);
  path {
    stroke-width: 6px;
    stroke: black;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  font-family: ${(props) => props.theme.fonts.eng};
  font-weight: 600;
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
`;

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};

const navVars = {
  top: { backgroundColor: "rgba(0,0,0,0)" },
  scroll: { backgroundColor: "rgba(0,0,0,1)" },
};

interface IForm {
  keyword: string;
}

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("tv");
  const history = useNavigate();
  const inputAnimation = useAnimation();
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();
  const { register, handleSubmit } = useForm<IForm>();
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({
        scaleX: 1,
      });
    }
    setSearchOpen((prev) => !prev);
  };
  const onValid = ({ keyword }: IForm) => {
    history(`/search?keyword=${keyword}`);
  };
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);
  return (
    <Nav variants={navVars} animate={navAnimation} initial="top">
      <Col>
        <Logo
          variants={logoVariants}
          animate="normal"
          whileHover="active"
          xmlns="http://www.w3.org/2000/svg"
          version="1.0"
          width="125.000000pt"
          height="25.000000pt"
          viewBox="0 0 125.000000 25.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g transform="translate(0.000000,25.000000) scale(0.100000,-0.100000)">
            <motion.path d="M7 243 c-12 -11 -8 -245 3 -238 5 3 10 48 10 98 l1 92 37 -69 c54 -101 62 -98 61 26 -1 114 -5 118 -17 13 l-7 -70 -38 78 c-38 80 -39 81 -50 70z M192 243 c-19 -7 -42 -58 -42 -93 0 -39 33 -73 63 -64 53 15 87 54 87 100 0 39 -66 74 -108 57z m78 -32 c22 -42 0 -92 -46 -105 -46 -14 -71 55 -38 102 20 28 69 30 84 3z M354 240 c-11 -4 -27 -22 -34 -39 -11 -26 -10 -35 4 -56 13 -20 25 -25 56 -25 21 0 42 5 45 11 5 7 -4 8 -27 4 -27 -5 -38 -2 -53 15 -18 20 -18 24 -4 48 11 21 24 28 52 30 20 2 37 7 37 13 0 11 -47 11 -76 -1z M458 244 c-12 -11 -10 -112 2 -119 6 -4 10 7 10 25 l0 31 37 -30 c51 -42 65 -39 22 5 l-34 35 29 25 c15 14 25 28 22 31 -3 4 -19 -6 -34 -20 -35 -33 -40 -34 -44 -1 -2 14 -6 22 -10 18z M580 185 c0 -37 4 -65 10 -65 6 0 10 11 10 25 0 20 5 25 25 25 14 0 25 5 25 10 0 6 -11 10 -25 10 -18 0 -25 5 -25 20 0 16 7 20 30 20 17 0 30 5 30 10 0 6 -18 10 -40 10 l-40 0 0 -65z M691 178 c-1 -65 2 -77 17 -82 9 -2 27 -7 40 -11 12 -3 22 -2 22 4 0 5 -13 12 -29 16 -27 6 -29 10 -38 78 l-10 72 -2 -77z M791 163 c-1 -56 3 -93 9 -93 12 0 12 137 0 165 -6 13 -9 -12 -9 -72z M855 194 l24 -55 -24 -39 c-29 -46 -30 -50 -11 -50 7 0 19 14 26 30 7 17 16 30 19 30 4 0 14 -21 22 -47 8 -25 20 -48 27 -51 8 -2 4 18 -11 60 l-24 63 23 52 c12 29 19 55 13 58 -5 3 -16 -12 -25 -34 -9 -23 -20 -41 -24 -41 -4 0 -14 18 -23 40 -8 22 -20 40 -26 40 -6 0 0 -25 14 -56z" />
          </g>
        </Logo>
        <Items>
          <Item>
            <Link to="/">Home {homeMatch && <Circle layoutId="circle" />}</Link>
          </Item>
          <Item>
            <Link to="tv">
              Tv Show {tvMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -215 : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            initial={{ scaleX: 0 }}
            animate={inputAnimation}
            transition={{ type: "linear" }}
            placeholder="Search for movie or tv show..."
          />
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;
