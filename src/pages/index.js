import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const { menu, allImageContent, other } = data
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Simple example</h1>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ margin: "1.3rem" }}>
            <h3>menu</h3>
            <div>
              {menu.edges.map(item => {

                // fetches the image based on the value that that is set on the appropriate json element
                const imageForMenu = allImageContent.edges.find(
                  element =>
                    element.node.fluid.originalName === item.node.image.src
                )

                return (
                  <div key={item.node.id}>
                    <h4>{item.node.title}</h4>
                    <h5>{item.node.description}</h5>
                    <Img fluid={imageForMenu.node.fluid} />
                    <Link to={item.node.link}>{item.node.title}</Link>
                  </div>
                )
              })}
            </div>
          </div>
          <div>
            <div style={{ margin: "1.3rem" }}>
              <h3>content</h3>
              {other.edges.map(item => {
                // fetches the image based on the value that that is set on the appropriate json element
                const imageforOther = allImageContent.edges.find(
                  x => x.node.fluid.originalName === item.node.image.src
                )
                return (
                  <div key={item.node.id}>
                    <Img fluid={imageforOther.node.fluid}/>
                    <h4 style={{margin:'0.8rem'}}>
                      {item.node.content}
                    </h4>
                    
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}
/**
 * query that will fetch all of the json file content and also all of the images
 */
export const pagequery = graphql`
  query {
    menu: allMenuJson {
      edges {
        node {
          id
          title
          description
          link
          image {
            src
          }
        }
      }
    }
    other: allOtherJson {
      edges {
        node {
          id
          content
          image {
            src
          }
        }
      }
    }
    allImageContent: allImageSharp {
      edges {
        node {
          fluid(maxWidth: 300) {
            originalName
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`

export default IndexPage
