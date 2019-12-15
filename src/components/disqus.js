import React from 'react'
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'

const DisqusComments = ({props}) => {
    let disqusConfig = {
        url: `https://the-code-less-travelled.netlify.com/`,
        identifier: `the-code-less-travelled`,
        title: `${props.title}`
    }

    return (
        <>
            <CommentCount config={ disqusConfig } placeholder={'...'} />
            <Disqus config={ disqusConfig } />
        </>
    )
}

export default DisqusComments