import React from "react"
import ContentLoader from "react-content-loader" 

const MyLoader = () => (
  <ContentLoader 
    speed={1}
    width={400}
    height={400}
    viewBox="0 0 400 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="180" rx="3" ry="3" width="180" height="56" /> 
    <rect x="200" y="180" rx="3" ry="3" width="180" height="56" /> 
    <rect x="0" y="250" rx="3" ry="3" width="380" height="56" /> 
    <rect x="0" y="320" rx="3" ry="3" width="380" height="56" /> 
    <rect x="0" y="390" rx="3" ry="3" width="380" height="56" /> 
    <rect x="100" y="130" rx="3" ry="3" width="178" height="30" /> 
    <circle cx="190" cy="90" r="30" />
  </ContentLoader>
)

export default MyLoader