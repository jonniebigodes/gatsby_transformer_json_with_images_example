import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = ({ data }) => {
  const { menu, other } = data
  return (
    <Layout>
      <SEO title="Page two" />
      <h1>Page with nodes extended and combined</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ margin: "1.3rem" }}>
          <h3>menu</h3>
          <div>
            {menu.edges.map(item => {
              return (
                <div key={item.node.id}>
                  <h4>{item.node.title}</h4>
                  <h5>{item.node.description}</h5>
                  <Img
                    fluid={item.node.fields.menuImage.childImageSharp.fluid}
                  />
                  <Link to={item.node.link}>{item.node.title}</Link>
                </div>
              )
            })}
          </div>
        </div>
        <div style={{ margin: "1.3rem" }}>
          <h3>content</h3>
          {
            other.edges.map(item=>{
              return (
                <div key={item.node.id}>
                  <Img fluid={item.node.fields.otherImage.childImageSharp.fluid}/>
                  <h4 style={{margin:'0.8rem'}}>
                      {item.node.content}
                    </h4>
                  </div>
              )
            })
          }
        </div>
      </div>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}
// page query with the updated fields that were created in gatsby-node.js making the query more streamlined.
export const query = graphql`
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
          fields {
            menuImage {
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    other: allOtherJson {
      edges {
        node {
          id
          content
          fields {
            otherImage {
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
export default SecondPage
