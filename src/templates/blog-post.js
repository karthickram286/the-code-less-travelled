import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { DiscussionEmbed } from 'disqus-react'

import Layout from '../components/layout'
import PostTags from '../components/postTags'
import { PostWrapper } from '../components/postwrapper'

const StyledTag = styled.span`
  font-style: italic;
`

export default ({ data }) => {
  const post = data.markdownRemark;
  const disqusShortName = 'the-code-less-travelled';
  const disqusConfig = {
    identifier: post.frontmatter.title.replace(/ +/g, ""), 
    title: post.frontmatter.title
  }
  console.log(disqusConfig.identifier);

  return (
    <Layout>
      <PostWrapper>
        <span className="datetime">{post.frontmatter.date}</span>
        <h1>{post.frontmatter.title}</h1>
        <div style={{ fontSize: '18px' }}dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr />
        <p>
          <StyledTag>Tags</StyledTag>: <PostTags tags={post.frontmatter.tags} />
        </p>
      </PostWrapper>
      <DiscussionEmbed shortname={disqusShortName} config={disqusConfig} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        tags
      }
    }
  }
`
