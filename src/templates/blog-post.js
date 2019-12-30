import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { DiscussionEmbed } from 'disqus-react'

import Layout from '../components/layout'
import PostTags from '../components/postTags'
import { PostWrapper } from '../components/postwrapper'
// import PostMessage from '../components/disqus'

const StyledTag = styled.span`
  font-style: italic;
`

export default ({ data }) => {
  const post = data.markdownRemark

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
      <DiscussionEmbed {...{
                              shortname: process.env.GATSBY_DISQUS_NAME,
                              config: {
                                identifier: post.frontmatter.title, 
                                title: post.frontmatter.title
                              }
                            } 
                        }  />
      {/* <PostMessage props={post.frontmatter.title}></PostMessage> */}
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
