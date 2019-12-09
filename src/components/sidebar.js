import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import {
  FaHome,
  FaUserSecret,
  FaLinkedin,
  FaGithub,
  FaHashtag,
  FaHackerrank,
  FaStackOverflow,
  FaXing
} from 'react-icons/fa'

const Sidebar = styled.div`
  /* Device = Tablets, iPads (portrait) */
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 20%;
  }

  /* Device = Tablets, iPads (landscape) */
  @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    width: 20%;
  }

  /* Device = Low resolution Tablets, Mobiles (landscape) */
  @media (min-width: 320px) and (max-width: 767px) {
    width: 10%;
    justify-content: flex-start;
    align-items: center;

    &::before {
      content: '';
      margin: 10px;
    }
  }

  display: flex;
  flex-direction: column;
  width: 30%;
  background-color: #193549;
  color: #dcdcdc;
  justify-content: center;
  align-items: center;
`

const Logo = styled.img`
  /* Device = Tablets, iPads (portrait) */
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 80px;
    height: 80px;
  }

  /* Device = Tablets, iPads (landscape) */
  @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    width: 80px;
    height: 80px;
  }

  /* Device = Low resolution Tablets, Mobiles (landscape) */
  @media (min-width: 320px) and (max-width: 767px) {
    width: 30px;
    height: 30px;
  }

  border-radius: 50%;
  overflow: hidden;
  width: 152px;
  height: 152px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const StyledHref = styled.a`
  text-decoration: none;
  color: inherit;
`

const MenuWrapper = styled.div`
  @media (min-width: 320px) and (max-width: 767px) {
    flex-direction: column;
    div {
      margin: 0;
    }
    span {
      display: none;
    }
  }

  display: flex;
  flex-direction: row;
  div {
    margin: 10px;
  }
`

const SiteTitle = styled.h1`
  display: flex;

  /* Device = Tablets, iPads (portrait) */
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 16px;
  }

  /* Device = Tablets, iPads (landscape) */
  @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    font-size: 16px;
  }

  /* Device = Low resolution Tablets, Mobiles (landscape) */
  @media (min-width: 320px) and (max-width: 767px) {
    display: none;
  }
`

const NameBoard = styled.h3`
  display: flex;

  /* Device = Tablets, iPads (portrait) */
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 12px;
  }

  /* Device = Tablets, iPads (landscape) */
  @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    font-size: 12px;
  }

  /* Device = Low resolution Tablets, Mobiles (landscape) */
  @media (min-width: 320px) and (max-width: 767px) {
    display: none;
  }
`

export default ({ title, authorName }) => (
  <Sidebar>
    <StyledLink to="/">
      <SiteTitle>{title}</SiteTitle>
    </StyledLink>
    <Logo
      src="https://media.licdn.com/dms/image/C5103AQFKD5Za66TbkA/profile-displayphoto-shrink_200_200/0?e=1581552000&v=beta&t=dmLrmxuepUKCPb_Vu4ZvfeXWgLu4gibULm17iOFOlGg"
      alt={authorName}
    />
    <NameBoard>{authorName}</NameBoard>
    <MenuWrapper>
      <div>
        <p>
          <StyledLink to="/">
            <FaHome /> <span>Home</span>
          </StyledLink>
        </p>
        <p>
          <StyledLink to="/about">
            <FaUserSecret /> <span>About</span>
          </StyledLink>
        </p>
        <p>
          <StyledLink to="/tags">
            <FaHashtag /> <span>Tags</span>
          </StyledLink>
        </p>
      </div>
      <div>
        <p>
          <StyledHref
            href="https://www.linkedin.com/in/karthick-ram"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaLinkedin /> <span>LinkedIn</span>
          </StyledHref>
        </p>
        <p>
          <StyledHref
            href="https://github.com/karthickram286"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub /> <span>GitHub</span>
          </StyledHref>
        </p>
        <p>
          <StyledHref
          href="https://www.hackerrank.com/Karthick_ram"
          target="_blank"
          rel="noopener noreferre"
          >
            <FaHackerrank /> <span>Hackerrank</span>
          </StyledHref>
        </p>
        <p>
          <StyledHref
          href="https://stackoverflow.com/users/6056634/karthick-ram"
          target="_blank"
          rel="noopener noreferre"
          >
            <FaStackOverflow /> <span>StackOverflow</span>
          </StyledHref>
        </p>
        <p>
          <StyledHref
          href="https://www.xing.com/profile/Karthick_Ramachandran3/cv"
          target="_blank"
          rel="noopener noreferre"
          >
            <FaXing /> <span>Xing</span>
          </StyledHref>
        </p>
      </div>
    </MenuWrapper>
  </Sidebar>
)
